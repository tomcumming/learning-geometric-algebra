import * as React from "react";

const guideColor = "#aaa";

type Props = {
  width: number;
  height: number;

  lineWidth: number;
};

export default function Graph({
  width,
  height,
  lineWidth,
  children,
}: React.PropsWithChildren<Props>) {
  const left = width / -2;
  const right = width / 2;
  const top = height / -2;
  const bottom = height / 2;

  return (
    <svg className="graph" viewBox={`${left} ${top} ${width} ${height}`}>
      {Array.from(range(left, right)).map((x) => (
        <line
          key={x}
          x1={x}
          y1={top}
          x2={x}
          y2={bottom}
          strokeWidth={lineWidth}
          stroke={guideColor}
        />
      ))}
      {Array.from(range(top, bottom)).map((y) => (
        <line
          key={y}
          x1={left}
          y1={y}
          x2={right}
          y2={y}
          strokeWidth={lineWidth}
          stroke={guideColor}
        />
      ))}
      {children}
    </svg>
  );
}

function* range(from: number, to: number) {
  for (let x = from; x <= to; x += 1) yield x;
}
