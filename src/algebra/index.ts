export type Basis = {
  zero: number;
  positive: number;
  negative: number;
};

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
        if (headN < basis.zero) return [0];
        else if (headN < basis.zero + basis.positive) return rest;
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

export class MultiVector {
  private constructor(private readonly parts: Map<string, number>) {}

  static sumTerms(basis: Basis, terms: Term[]): MultiVector {
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

    return new MultiVector(parts);
  }

  asTerms(): Term[] {
    return Array.from(this.parts).map(([vs, s]) => [s, ...Array.from(vs)]);
  }

  mul(basis: Basis, other: MultiVector): MultiVector {
    let terms: Term[] = [];
    for (const term of this.asTerms())
      for (const otherTerm of other.asTerms())
        terms.push([...term, ...otherTerm]);
    return MultiVector.sumTerms(basis, terms);
  }

  toString(): string {
    return Array.from(this.parts)
      .sort(([vs1], [vs2]) => vs1.localeCompare(vs2))
      .map(([vs, s]) => (vs === "" ? s : `${s}e${vs}`))
      .join(" + ");
  }
}