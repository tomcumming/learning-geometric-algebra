import * as React from "react";
import * as ReactDom from "react-dom";

import { MultiVector } from "./ge";
import { product, G2 } from "./algebra/g2";

import Graph from "./components/graph";
import Vector from "./components/vector";

function init() {
  ReactDom.render(
    <Graph width={6} height={6}>
      <Vector x={2} y={2} color="red" />
    </Graph>,
    document.querySelector("#wrapper")
  );
}

init();
