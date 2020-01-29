import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Navbar } from "react-bulma-components";
import "react-bulma-components/dist/react-bulma-components.min.css";

import XmlToJson from "./components/textbox.component";
import "./index.sass";
import Header from "./components/header.component";

export default function App() {
  return (
    <Fragment>
      <Navbar color="info">
        {" "}
        <Navbar.Brand>
          <Navbar.Item renderAs="a" href="https://csmm.app">
            <img
              src="/img/CSMM_Blue-1.png"
              alt="CSMM: a 7 Days to die server manager"
              width="50"
            />
          </Navbar.Item>
        </Navbar.Brand>
        <Navbar.Item>Shop converter</Navbar.Item>
      </Navbar>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <title>Shop converter</title>
      </Helmet>
      <Header></Header>
      <XmlToJson />
    </Fragment>
  );
}
