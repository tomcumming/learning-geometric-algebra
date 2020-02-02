import { MultiplicationTable, makeProduct } from "../ge";

export type PGA2 =
  | "s" // Scalar
  | "e0" // Vector
  | "e1"
  | "e2"
  | "e01" // Bivector
  | "e20"
  | "e12"
  | "e012"; // I / Trivector

const mulitplicationTable: MultiplicationTable<PGA2> = {
  s: {
    s: ["s", 1],
    e0: ["e0", 1],
    e1: ["e1", 1],
    e2: ["e2", 1],
    e01: ["e01", 1],
    e20: ["e20", 1],
    e12: ["e12", 1],
    e012: ["e012", 1]
  },
  e0: {
    s: ["e0", 1],
    e1: ["e01", 1],
    e2: ["e20", -1],
    e12: ["e012", 1]
  },
  e1: {
    s: ["e1", 1],
    e0: ["e01", -1],
    e1: ["s", 1],
    e2: ["e12", 1],
    e01: ["e0", -1],
    e20: ["e012", 1],
    e12: ["e2", 1],
    e012: ["e20", 1]
  },
  e2: {
    s: ["e2", 1],
    e0: ["e20", 1],
    e1: ["e12", -1],
    e2: ["s", 1],
    e01: ["e012", 1],
    e20: ["e0", 1],
    e12: ["e1", -1],
    e012: ["e01", 1]
  },
  e01: {
    s: ["e01", 1],
    e1: ["e0", 1],
    e2: ["e012", 1],
    e12: ["e20", -1]
  },
  e20: {
    s: ["e20", 1],
    e1: ["e012", 1],
    e2: ["e0", -1],
    e12: ["e01", 1]
  },
  e12: {
    s: ["e12", 1],
    e0: ["e012", 1],
    e1: ["e2", -1],
    e2: ["e1", 1],
    e01: ["e20", 1],
    e20: ["e01", -1],
    e12: ["s", -1],
    e012: ["e0", -1]
  },
  e012: {
    s: ["e012", 1],
    e1: ["e20", 1],
    e2: ["e01", 1],
    e12: ["e0", -1]
  }
};

export const product = makeProduct(mulitplicationTable);
