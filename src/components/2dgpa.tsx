import * as React from "react";

import Graph from "./graph";
import Point from "./point";
import useTime from "../hooks/time";
import { MultiVector } from "../ge";
import { PGA2, product, dual } from "../algebra/2dpga";

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
    e1: -0.5,
    e2: -1,
    e0: 2 + Math.sin(time) * 0.5
  };

  const p1: Pick<MultiVector<PGA2>, "e20" | "e01" | "e12"> = {
    e20: -3 + Math.sin(time) * 0.5,
    e01: -3 + Math.cos(time) * 0.5,
    e12: 1
  };

  const p2: Pick<MultiVector<PGA2>, "e20" | "e01" | "e12"> = {
    e20: 0 + Math.cos(time) * 0.5,
    e01: -1 + Math.sin(-time) * 0.5,
    e12: 1
  };

  const prodLine = dual(product(dual(p1), dual(p2))) as Pick<
    MultiVector<PGA2>,
    "e0" | "e1" | "e2"
  >;
  const joinLine = { e0: prodLine.e0, e1: prodLine.e1, e2: prodLine.e2 };

  const joinY = (x: number) => (joinLine.e1 * x + joinLine.e0) / -joinLine.e2;

  const intProd = product(joinLine, l1) as Pick<
    MultiVector<PGA2>,
    "e20" | "e01" | "e12"
  >;
  const intMeet = product({ s: 1 / intProd.e12 }, intProd) as Pick<
    MultiVector<PGA2>,
    "e20" | "e01" | "e12"
  >;

  return (
    <Graph width={10} height={10} lineWidth={0.05}>
      <line
        x1={-5}
        y1={-((l1.e1 * -5 + l1.e0) / -l1.e2)}
        x2={5}
        y2={-((l1.e1 * 5 + l1.e0) / -l1.e2)}
        stroke="blue"
        strokeWidth={0.05}
      />

      <line
        x1={-5}
        y1={-joinY(-5)}
        x2={5}
        y2={-joinY(5)}
        stroke={"black"}
        strokeWidth={0.05}
      />

      <Point x={p1.e20} y={p1.e01} color={"green"} lineWidth={0.1} label="P1" />

      <Point x={p2.e20} y={p2.e01} color={"green"} lineWidth={0.1} label="P2" />

      <Point
        x={intMeet.e20}
        y={intMeet.e01}
        color="red"
        lineWidth={0.1}
        label="Intersection"
      />
    </Graph>
  );
}
