import { allCombinations } from "./combinations";

export type Basis = [number, number, number];

export type Vector = string;
export type Scalar = number;

export type TermPart = Vector | Scalar;
export type Term = TermPart[];

export function normalizeTerm(basis: Basis, parts: Term): Term {
  if (parts.length < 2) return parts;
  else {
    const head = parts[0];
    const tail = normalizeTerm(basis, parts.slice(1));
    const second = tail[0];
    const rest = tail.slice(1);

    if (typeof second === "number") {
      if (typeof head === "number")
        return normalizeTerm(basis, [head * second, ...rest]);
      else return normalizeTerm(basis, [second, head, ...rest]);
    } else if (typeof head === "string") {
      const headN = parseInt(head);
      const secondN = parseInt(second);
      if (headN === secondN) {
        const [positives, _negatives, zeros] = basis;

        if (headN < zeros) return [0];
        else if (headN < zeros + positives) return rest;
        else return normalizeTerm(basis, [-1, ...rest]);
      } else if (headN > secondN) {
        return normalizeTerm(basis, [-1, second, head, ...rest]);
      } else {
        return [head, ...tail];
      }
    } else if (head === 0) return [0];
    else return [head, ...tail];
  }
}

export function elems([positives, negatives, zeros]: Basis): Vector[][] {
  let vectors: Vector[] = [];
  for (let v = 0; v < positives + negatives + zeros; v += 1)
    vectors.push(v.toString());

  return allCombinations(vectors);
}

export class MultiVector<B extends Basis> {
  private constructor(
    readonly basis: B,
    private readonly parts: Map<string, number>
  ) {}

  elem(...vs: number[] | Vector[]): number {
    const existing = this.parts.get(vs.join(""));
    return existing === undefined ? 0 : existing;
  }

  restrict(...input: (number | Vector)[][]): MultiVector<B> {
    const vss = input.map((vs) => vs.map((n) => n.toString()));
    const terms: Term[] = vss.map((vs) => {
      const existing = this.elem(...vs);
      return [existing, ...vs];
    });

    return MultiVector.sumTerms(this.basis, terms);
  }

  static sumTerms<B extends Basis>(basis: B, terms: Term[]): MultiVector<B> {
    let parts = new Map<string, number>();

    for (const term of terms) {
      const normalized = normalizeTerm(basis, term);
      const hasScalarHead = typeof normalized[0] === "number";
      const scalar: number = hasScalarHead
        ? (normalized[0] as number)
        : Math.sign(term.length);
      const vectorString = (hasScalarHead
        ? normalized.slice(1)
        : normalized
      ).join("");
      const existing = parts.get(vectorString);
      if (existing === undefined) parts.set(vectorString, scalar);
      else parts.set(vectorString, existing + scalar);
    }

    const zeros = Array.from(parts).filter(([_vs, p]) => p === 0);
    for (const [zeroVs] of zeros) parts.delete(zeroVs);

    return new MultiVector(basis, parts);
  }

  asTerms(): Term[] {
    return Array.from(this.parts).map(([vs, s]) => [s, ...Array.from(vs)]);
  }

  mul(other: MultiVector<B>): MultiVector<B> {
    let terms: Term[] = [];
    for (const term of this.asTerms())
      for (const otherTerm of other.asTerms())
        terms.push([...term, ...otherTerm]);
    return MultiVector.sumTerms(this.basis, terms);
  }

  dual(): MultiVector<B> {
    const opposite = new Map<string, string>();
    const names = elems(this.basis).map((vs) => vs.join(""));
    for (let idx = 0; idx < names.length; idx += 1)
      opposite.set(names[idx], names[names.length - idx - 1]);

    let terms: Term[] = [];
    for (const [vs, s] of this.parts)
      terms.push([s, ...Array.from(opposite.get(vs) as string)]);

    return MultiVector.sumTerms(this.basis, terms);
  }

  toString(): string {
    return Array.from(this.parts)
      .sort(([vs1], [vs2]) => vs1.localeCompare(vs2))
      .map(([vs, s]) => (vs === "" ? s : `${s}e${vs}`))
      .join(" + ");
  }
}
