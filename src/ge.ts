export type MultiVector<Basis extends string> = { [EL in Basis]: number };

export type MultiplicationTable<Basis extends string> = {
  [K in Basis]: {
    [J in Basis]?: [Basis, number /* sign */];
  };
};

export function makeProduct<Basis extends string>(
  table: MultiplicationTable<Basis>
) {
  return (
    a: Partial<MultiVector<Basis>>,
    b: Partial<MultiVector<Basis>>
  ): Partial<MultiVector<Basis>> => {
    const items = Object.entries(a).flatMap(aItem => {
      const el1 = aItem[0] as Basis;
      const scale1 = aItem[1] as number;
      return Object.entries(b).flatMap<[Basis, number]>(bItem => {
        const el2 = bItem[0] as Basis;
        const scale2 = bItem[1] as number;
        const lookup = table[el1][el2];
        return lookup !== undefined
          ? [[lookup[0], lookup[1] * scale1 * scale2]]
          : [];
      });
    });

    return items.reduce((p, [el, x]) => {
      const existing = p[el] === undefined ? 0 : (p[el] as number);
      return { ...p, [el]: existing + x };
    }, {} as Partial<MultiVector<Basis>>);
  };
}
