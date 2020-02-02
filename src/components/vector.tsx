import * as React from "react";

export type Props = {
  x: number;
  y: number;

  lineWidth: number;
  label?: string;
  color: string;
};

export default function Vector({ x, y, lineWidth, color, label }: Props) {
  return (
    <>
      <line
        x1={0}
        y1={0}
        x2={x}
        y2={-y}
        strokeWidth={lineWidth}
        stroke={color}
      />
      {label === undefined ? (
        undefined
      ) : (
        <text
          x={x}
          y={-y}
          fill={color}
          fontSize={lineWidth * 5}
          textAnchor={x > 0 ? "start" : "end"}
        >
          {label}
        </text>
      )}
    </>
  );
}
