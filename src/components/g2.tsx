import * as React from "react";

import useTime from "../hooks/time";

import Graph from "./graph";
import Vector from "./vector";
import { MultiVector } from "../ge";
import { G2, product } from "../algebra/g2";

export default function G2Demo() {
  return (
    <>
      <h1>2 Dimensional Clifford Algebra</h1>
      <Product />
    </>
  );
}

function Product() {
  const time = useTime();

  const v: Pick<MultiVector<G2>, "e1" | "e2"> = {
    e1: Math.cos(time) * 2,
    e2: Math.sin(time) * 2
  };
  const u: Pick<MultiVector<G2>, "e1" | "e2"> = { e1: 0, e2: 3 };

  const p = product(v, u);
  const dot = p.s;
  const wedge = p.e12;

  const wedgePoints = [
    [0, 0],
    [v.e1, v.e2],
    [v.e1 + u.e1, v.e2 + u.e2],
    [u.e1, u.e2]
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
          x={v.e1 as number}
          y={v.e2 as number}
          color="red"
          lineWidth={0.1}
          label="𝑣"
        />
        <Vector
          x={u.e1 as number}
          y={u.e2 as number}
          color="blue"
          lineWidth={0.1}
          label="𝑢"
        />

        <text x={3.5} y={0} fontSize={0.5} color="black" textAnchor="end">
          𝑣⋅𝑢
        </text>
        {dot === undefined ? (
          undefined
        ) : (
          <Vector origin={[4, 0]} x={4} y={dot} color="black" lineWidth={0.1} />
        )}

        <text x={-4} y={0} fontSize={0.5} fill="darkgreen">
          𝑣∧𝑢
        </text>
        {wedge === undefined ? (
          undefined
        ) : (
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
