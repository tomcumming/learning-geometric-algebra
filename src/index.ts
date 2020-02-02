import { MultiVector } from "./ge";
import { product, G2 } from "./algebra/g2";

const s: Partial<MultiVector<G2>> = { s: 3 };
const v: Partial<MultiVector<G2>> = { e1: 1 };
const u: Partial<MultiVector<G2>> = { e2: 1 };

console.log("sv", product(s, v));
console.log("vs", product(v, s));
console.log();
console.log("vu", product(v, u));
console.log("uv", product(u, v));
console.log("vuv", product(v, product(u, v)));
console.log("uvu", product(u, product(v, u)));
