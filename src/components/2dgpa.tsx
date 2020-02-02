import * as React from "react";

import Graph from "./graph";
import Point from "./point";

export default function GPA2DDemo() {
  return (
    <>
      <h1>2 Dimensional Clifford Algebra</h1>
      <Test />
    </>
  );
}

function Test() {
  return (
    <Graph width={10} height={10} lineWidth={0.05}>
      <Point x={2} y={3} color={"red"} label="P1" lineWidth={0.1} />
      <Point x={-3} y={2} color={"blue"} label="P2" lineWidth={0.1} />
    </Graph>
  );
}
