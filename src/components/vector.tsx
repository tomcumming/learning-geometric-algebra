import * as React from "react";

export type Props = {
  x: number;
  y: number;

  lineWidth: number;
  label?: string;
  color: string;
  origin?: [number, number];
};

export default function Vector({
  x,
  y,
  lineWidth,
  color,
  label,
  origin,
}: Props) {
  const ox = origin === undefined ? 0 : origin[0];
  const oy = origin === undefined ? 0 : origin[1];

  return (
    <>
      <line
        x1={ox}
        y1={-oy}
        x2={x}
        y2={-y}
        strokeWidth={lineWidth}
        stroke={color}
      />
      {label === undefined ? undefined : (
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
