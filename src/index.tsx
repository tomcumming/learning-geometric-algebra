import * as React from "react";
import * as ReactDom from "react-dom";

import { MultiVector } from "./ge";
import { product, G2 } from "./algebra/g2";

import G2demo from "./components/g2";

function init() {
  ReactDom.render(<G2demo />, document.querySelector("#wrapper"));
}

init();
