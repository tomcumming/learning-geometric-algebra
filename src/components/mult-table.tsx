import * as React from "react";

import { elems, MultiVector, Basis } from "../algebra";

function SelectBasis({
  label: name,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  const onChangeOption = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(parseInt(e.currentTarget.value));
    },
    [onChange]
  );

  return (
    <>
      <label>{name}</label>
      <select
        value={value}
        onChange={onChangeOption}
        style={{ margin: "0 1em" }}
      >
        {[0, 1, 2, 3, 4].map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
    </>
  );
}

export default function MultTable() {
  const [positive, setPositive] = React.useState(2);
  const [negative, setNegative] = React.useState(0);
  const [zero, setZero] = React.useState(1);

  const cells = React.useMemo(() => {
    const basis: Basis = [positive, negative, zero];

    const es = elems(basis);

    const headingRow = ["*"].concat(
      es.map((vs) => MultiVector.sumTerms(basis, [vs]).toString())
    );

    const bodyRows = es.map((e1) =>
      [MultiVector.sumTerms(basis, [e1]).toString()].concat(
        es.map((e2) => MultiVector.sumTerms(basis, [[...e1, ...e2]]).toString())
      )
    );

    const x = MultiVector.sumTerms(basis, [["1", "0"]]);
    console.log(x.toString());

    return [headingRow, ...bodyRows];
  }, [positive, negative, zero]);

  return (
    <div className="mult-table">
      <h1>Multiplication table</h1>
      <form>
        <SelectBasis label="Positive" value={positive} onChange={setPositive} />
        <SelectBasis label="Negative" value={negative} onChange={setNegative} />
        <SelectBasis label="Zero" value={zero} onChange={setZero} />
      </form>
      <table>
        <tbody>
          {cells.map((row, rowi) => (
            <tr key={rowi}>
              {row.map((cell, celli) => {
                const oddBlade =
                  cell.length > 1 && cell.length % 2 === 1
                    ? "odd-blade"
                    : undefined;

                return rowi === 0 || celli === 0 ? (
                  <th key={celli} className={oddBlade}>
                    {cell === "" ? "s" : cell}
                  </th>
                ) : (
                  <td key={celli}>
                    {cell === ""
                      ? celli === 1 && rowi === 1
                        ? "1"
                        : "0"
                      : cell}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
