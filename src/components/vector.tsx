import * as React from "react";

export type Props = {
  x: number;
  y: number;

  label?: string;
  color: string;
};

export default function Vector({ x, y, color }: Props) {
  return <line x1={0} y1={0} x2={x} y2={y} strokeWidth={0.05} stroke={color} />;
}
