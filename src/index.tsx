/*
import * as React from "react";
import * as ReactDom from "react-dom";

import { MultiVector } from "./ge";
import { product, G2 } from "./algebra/g2";

import G2demo from "./components/g2";
import PGA2Ddemo from "./components/2dgpa";

function init() {
  ReactDom.render(
    <div style={{ maxWidth: "100vmin" }}>
      <G2demo />x
      <PGA2Ddemo />
    </div>,
    document.querySelector("#wrapper")
  );
}

init();
*/

import { normalizeTerm, TermPart, Basis, MultiVector } from "./algebra";

const simpleBasis: Basis = {
  zero: 1,
  positive: 1,
  negative: 1
};

function testTerm(term: TermPart[]) {
  console.log(term, normalizeTerm(simpleBasis, term));
}

testTerm([1, 2, 3]); // 6
testTerm([2, "2", 3, "2"]); // 2e2 * 3e2 = -6
testTerm([2, "2", 3, "2", "1"]); //2e2 * 3e21 = -6e1
testTerm([2, "2", 3, "2", "1", 0]);
testTerm(["0", "1", "2"]); // 1e0 * 1e1 * 1e2 = e012
testTerm(["2", "1", "0"]); // 1e2 * 1e1 * 1e0 = -e012
testTerm(["0", "1", "2"]); // 1e0 * 1e1 * 1e2 = e012
testTerm(["2", "0", "1"]); // 1e2 * 1e0 * 1e1 = e012

console.log(MultiVector.sumTerms(simpleBasis, [[3]]).toString());
console.log(MultiVector.sumTerms(simpleBasis, [[3, "1"]]).toString());

console.log(
  MultiVector.sumTerms(simpleBasis, [
    [1, "1", "2"],
    [1, "1"],
    ["1", 1, "2"]
  ]).toString()
);
console.log(
  MultiVector.sumTerms(simpleBasis, [
    [1, "0"],
    ["1", 1]
  ])
    .mul(simpleBasis, MultiVector.sumTerms(simpleBasis, [[1, "2"]]))
    .toString()
);

console.log(
  MultiVector.sumTerms(simpleBasis, [
    [1, "0"],
    ["1", 1]
  ])
    .mul(
      simpleBasis,
      MultiVector.sumTerms(simpleBasis, [
        [2, "0"],
        [1, "2"]
      ])
    )
    .toString()
);
