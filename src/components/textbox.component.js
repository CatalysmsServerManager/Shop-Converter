import 'react-toastify/dist/ReactToastify.css';

import React, { Fragment, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { toast, ToastContainer } from 'react-toastify';
import * as XML from 'xml2js';

export default function XmlToJson() {
  const [json, setJson] = useState("");

  function convert() {
    const input = document.getElementById("input").value;
    XML.parseString(input, (err, output) => {
      if (err) {
        console.log(err);
        return toast("Invalid XML :(\n" + err);
      }

      if (!output) {
        return;
      }

      console.log('------------');
      console.log(output);
      console.log('------------');

      if (
        !output.Shop ||
        !output.Shop.Items ||
        !output.Shop.Items[0] ||
        !output.Shop.Items[0].Shop
      ) {
        return toast(
          "Invalid XML, make sure you copy the full XML from ServerTools"
        );
      }

      const jsonData = [];
      for (const itemObj of output.Shop.Items[0].Shop) {
        const { $: item } = itemObj;
        jsonData.push({
          name: item.name,
          friendlyName: item.SecondaryName,
          amount: item.Count,
          quality: item.Quality,
          price: item.Price
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
