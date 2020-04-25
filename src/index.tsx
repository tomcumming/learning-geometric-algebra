import * as React from "react";
import * as ReactDom from "react-dom";

import G2demo from "./components/g2";
import PGA2Ddemo from "./components/2dgpa";

function init() {
  ReactDom.render(
    <div style={{ maxWidth: "100vmin" }}>
      <G2demo />
      <PGA2Ddemo />
    </div>,
    document.querySelector("#wrapper")
  );
}

init();
