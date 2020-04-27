import * as React from "react";

import useTime from "../hooks/time";

import Graph from "./graph";
import Vector from "./vector";

import { MultiVector } from "../algebra";

export default function G2Demo() {
  return (
    <>
      <h1>2 Dimensional Clifford Algebra</h1>
      <Product />
    </>
  );
}

type Basis = [2, 0, 0]; // 2d Vectorspace GA
const basis: Basis = [2, 0, 0];

function Product() {
  const time = useTime();

  const v = MultiVector.sumTerms(basis, [
    [Math.cos(time) * 2, "0"],
    [Math.sin(time) * 2, "1"],
  ]);
  const u = MultiVector.sumTerms(basis, [[3, "1"]]);

  const p = v.mul(u);
  const dot = p.elem();
  const wedge = p.elem(0, 1);

  const wedgePoints = [
    [0, 0],
    [v.elem(0), v.elem(1)],
    [v.elem(0) + u.elem(0), v.elem(1) + u.elem(1)],
    [u.elem(0), u.elem(1)],
  ];

  return (
    <section>
      <h2>Product example</h2>
      <Graph width={12} height={12} lineWidth={0.05}>
        <polygon
          points={wedgePoints.map(([x, y]) => `${x},${-y}`).join(" ")}
          fill="darkgreen"
          opacity={0.5}
        />

        <Vector
          x={v.elem(0)}
          y={v.elem(1)}
          color="red"
          lineWidth={0.1}
          label="𝑣"
        />
        <Vector
          x={u.elem(0)}
          y={u.elem(1)}
          color="blue"
          lineWidth={0.1}
          label="𝑢"
        />

        <text x={3.5} y={0} fontSize={0.5} color="black" textAnchor="end">
          𝑣⋅𝑢
        </text>
        {dot === undefined ? undefined : (
          <Vector origin={[4, 0]} x={4} y={dot} color="black" lineWidth={0.1} />
        )}

        <text x={-4} y={0} fontSize={0.5} fill="darkgreen">
          𝑣∧𝑢
        </text>
        {wedge === undefined ? undefined : (
          <Vector
            origin={[-4, 0]}
            x={-4}
            y={wedge}
            color="darkgreen"
            lineWidth={0.1}
          />
        )}
      </Graph>
    </section>
  );
}
