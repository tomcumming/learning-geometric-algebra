import * as React from "react";
import * as ReactDom from "react-dom";

import { MultiVector } from "./ge";
import { product, G2 } from "./algebra/g2";

import G2demo from "./components/g2";
import PGA2Ddemo from "./components/2dgpa";

function init() {
  ReactDom.render(<PGA2Ddemo />, document.querySelector("#wrapper"));
}

init();
