import * as React from "react";

import Graph from "./graph";
import Point from "./point";
import useTime from "../hooks/time";
import { MultiVector } from "../algebra";

type Basis = [2, 0, 1]; // 2d Projective
const basis: Basis = [2, 0, 1];

export default function GPA2DDemo() {
  return (
    <>
      <h1>2 Dimensional Projective Geometric Algebra</h1>
      <Test />
    </>
  );
}

function Test() {
  const time = useTime();

  const l1 = MultiVector.sumTerms(basis, [
    [-0.5, "1"],
    [-1, "2"],
    [2 + Math.sin(time) * 0.5, "0"],
  ]);

  const p1 = MultiVector.sumTerms(basis, [
    [-3 + Math.sin(time) * 0.5, "2", "0"],
    [-3 + Math.cos(time) * 0.5, "0", "1"],
    ["1", "2"],
  ]);

  const p2 = MultiVector.sumTerms(basis, [
    [0 + Math.cos(time) * 0.5, "2", "0"],
    [-1 + Math.sin(-time) * 0.5, "0", "1"],
    ["1", "2"],
  ]);

  const prodLine = p1.dual().mul(p2.dual()).dual();
  const joinLine = prodLine.restrict([0], [1], [2]);

  const joinY = (x: number) =>
    (joinLine.elem(1) * x + joinLine.elem(0)) / -joinLine.elem(2);

  const intProd = joinLine.mul(l1);

  const intMeet = MultiVector.sumTerms(basis, [[1 / intProd.elem(1, 2)]]).mul(
    intProd
  );

  return (
    <Graph width={10} height={10} lineWidth={0.05}>
      <line
        x1={-5}
        y1={-((l1.elem(1) * -5 + l1.elem(0)) / -l1.elem(2))}
        x2={5}
        y2={-((l1.elem(1) * 5 + l1.elem(0)) / -l1.elem(2))}
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

      <Point
        x={-p1.elem(0, 2)}
        y={p1.elem(0, 1)}
        color={"green"}
        lineWidth={0.1}
        label="P1"
      />

      <Point
        x={-p2.elem(0, 2)}
        y={p2.elem(0, 1)}
        color={"green"}
        lineWidth={0.1}
        label="P2"
      />

      <Point
        x={-intMeet.elem(0, 2)}
        y={intMeet.elem(0, 1)}
        color="red"
        lineWidth={0.1}
        label="Intersection"
      />
    </Graph>
  );
}
