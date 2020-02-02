import * as React from "react";

import Graph from "./graph";
import Point from "./point";
import useTime from "../hooks/time";
import { MultiVector } from "../ge";
import { PGA2, product } from "../algebra/2dpga";

export default function GPA2DDemo() {
  return (
    <>
      <h1>2 Dimensional Projective Geometric Algebra</h1>
      <Test />
    </>
  );
}

function euclideanPoint(
  x: number,
  y: number
): Pick<MultiVector<PGA2>, "e20" | "e01" | "e12"> {
  return {
    e20: x,
    e01: y,
    e12: 1
  };
}

function Test() {
  const time = useTime();

  const l1: Pick<MultiVector<PGA2>, "e1" | "e2" | "e0"> = {
    e1: 1,
    e2: -1,
    e0: 1 + Math.sin(time)
  };

  const l2: Pick<MultiVector<PGA2>, "e1" | "e2" | "e0"> = {
    e1: -0.5,
    e2: -1,
    e0: 2.5
  };

  const intersect = product(l1, l2);
  // normalize
  const i = product({ s: 1 / (intersect.e12 as number) }, intersect);

  return (
    <Graph width={10} height={10} lineWidth={0.05}>
      <line
        x1={-5}
        y1={-(-5 + l1.e0)}
        x2={5}
        y2={-(5 + l1.e0)}
        stroke="green"
        strokeWidth={0.05}
      />
      <line
        x1={-5}
        y1={-(-5 / -2 + l2.e0)}
        x2={5}
        y2={-(5 / -2 + l2.e0)}
        stroke="blue"
        strokeWidth={0.05}
      />
      <Point
        x={i.e20 as number}
        y={i.e01 as number}
        color={"red"}
        label="P1"
        lineWidth={0.1}
      />
    </Graph>
  );
}
