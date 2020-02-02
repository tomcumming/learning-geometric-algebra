import * as React from "react";

import useTime from "../hooks/time";

import Graph from "./graph";
import Vector from "./vector";
import { MultiVector } from "../ge";
import { G2, product } from "../algebra/g2";

export default function G2Demo() {
  return (
    <>
      <DotProduct />
    </>
  );
}

function DotProduct() {
  const time = useTime();

  const v: Partial<MultiVector<G2>> = {
    e1: Math.cos(time) * 2,
    e2: Math.sin(time) * 2
  };
  const u: Partial<MultiVector<G2>> = { e1: 0, e2: 3 };

  const dot = product(v, u).s;

  return (
    <section>
      <h2>Dot product example</h2>
      <Graph width={12} height={12} lineWidth={0.05}>
        <Vector
          x={v.e1 as number}
          y={v.e2 as number}
          color="red"
          lineWidth={0.1}
          label="v"
        />
        <Vector
          x={u.e1 as number}
          y={u.e2 as number}
          color="blue"
          lineWidth={0.1}
          label="u"
        />
        <text x={3.5} y={0} fontSize={0.5} color="black" textAnchor="end">
          v.u
        </text>
        {dot === undefined ? (
          undefined
        ) : (
          <Vector origin={[4, 0]} x={4} y={dot} color="black" lineWidth={0.1} />
        )}
      </Graph>
    </section>
  );
}
