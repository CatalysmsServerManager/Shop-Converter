import React, { useState, Fragment } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XML from "xml2js";

export default function XmlToJson() {
  const [json, setJson] = useState("");

  function convert() {
    const input = document.getElementById("input").value;
    XML.parseString(input, (err, output) => {
      if (err) {
        return toast("Invalid XML, cannot convert :(");
      }

      if (!output) {
        return;
      }

      if (
        !output.Shop ||
        !output.Shop.items ||
        !output.Shop.items[0] ||
        !output.Shop.items[0].shop
      ) {
        return toast(
          "Invalid XML, make sure you copy the full XML from ServerTools"
        );
      }

      const jsonData = [];
      for (const itemObj of output.Shop.items[0].shop) {
        const { $: item } = itemObj;
        jsonData.push({
          name: item.name,
          friendlyName: item.secondaryName,
          amount: item.count,
          quality: item.quality,
          price: item.price
        });
      }
      navigator.clipboard.writeText(JSON.stringify(jsonData));
      setJson(JSON.stringify(jsonData, null, 5));
      toast("Copied JSON to clipboard.");
    });
    return;
  }

  return (
    <Fragment>
      <div className="flexTwo">
        <h2>XML</h2>
        <h2>JSON</h2>
      </div>
      <div className="flex">
        <textarea
          autoFocus
          className="code-text"
          id="input"
          onChange={() => convert()}
        ></textarea>

        <SyntaxHighlighter className="code-text" id="output" language="json">
          {json}
        </SyntaxHighlighter>
      </div>
      <ToastContainer />
    </Fragment>
  );
}
