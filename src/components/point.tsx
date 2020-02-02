import * as React from "react";

export type Props = {
  x: number;
  y: number;
  color: string;
  lineWidth: number;
  label?: string;
};

export default function Point({ x, y, color, lineWidth, label }: Props) {
  return (
    <>
      <circle cx={x} cy={-y} fill={color} r={lineWidth} />
      {label === undefined ? (
        undefined
      ) : (
        <text
          x={x}
          y={-(y + 0.1)}
          fill={color}
          fontSize={lineWidth * 5}
          textAnchor={x < 0 ? "start" : "end"}
        >
          {label}
        </text>
      )}
    </>
  );
}
