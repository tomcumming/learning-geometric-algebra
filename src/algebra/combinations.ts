export function combinations<T>(count: number, items: T[]): T[][] {
  if (count < 0 || count > items.length) return [];
  if (count === 0) return [[]];

  const withHeads = combinations(count - 1, items.slice(1)).map((xs) => [
    items[0],
    ...xs,
  ]);
  const withoutHeads = combinations(count, items.slice(1));
  return [...withHeads, ...withoutHeads];
}

export function allCombinations<T>(items: T[]): T[][] {
  let lengths = [];
  for (let length = 0; length <= items.length; length += 1)
    lengths.push(length);

  return lengths.flatMap((l) => combinations(l, items));
}
