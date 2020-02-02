import { makeProduct, MultiplicationTable } from "../ge";

export type G2 = "s" | "e1" | "e2" | "e12";

const g2MultiplicationTable: MultiplicationTable<G2> = {
  s: {
    s: ["s", 1],
    e1: ["e1", 1],
    e2: ["e2", 1],
    e12: ["e12", 1]
  },
  e1: {
    s: ["e1", 1],
    e1: ["s", 1],
    e2: ["e12", 1],
    e12: ["e2", 1]
  },
  e2: {
    s: ["e2", 1],
    e1: ["e12", -1],
    e2: ["s", 1],
    e12: ["e1", -1]
  },
  e12: {
    s: ["e12", 1],
    e1: ["e2", -1],
    e2: ["e1", 1],
    e12: ["s", -1]
  }
};

export const product = makeProduct(g2MultiplicationTable);
