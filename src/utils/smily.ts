// - [x] String reverse with smiley
function reversewithSmiley2(s: string) {
  const seg = new Intl.Segmenter(undefined, { granularity: "grapheme" });
  return Array.from(seg.segment(s), (x) => x.segment)
    .reverse()
    .join("");
}

reversewithSmiley2("ab😊jk👍🏽a🙂");

function flatten(arr: any[]): number[] {
  return arr.reduce(
    (acc: number[], item: number | number[]) =>
      Array.isArray(item) ? acc.concat(flatten(item)) : acc.concat(item),
    []
  );
}

flatten([1, 2, [3, 4, [5, 6]]]); // => [1,2,3,4,5,6]

function sum(a?: number): any {
  if (!a) return 0;
  return function (b?: number): number | (() => {}) {
    if (!b) return a;
    return sum(a + b);
  };
}
sum(1)(2)(3)();
