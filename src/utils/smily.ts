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
      acc.concat(Array.isArray(item) ? flatten(item) : item),
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

/* function func(...arg1) {
  if (arg1.length === 1) return arg1[0];
  return function (...arg2) {
    if (arg2.length === 0) return arg1[1];
    if (arg1[0] === "add") {
      let sum = 0;
      const res = [...arg1, ...arg2];
      res.shift();
      sum = res.reduce((acc, item) => acc + item, 0);
      return func("add", sum);
    }
  };
}
func("add", 2, 3, 6)(12, 15, 16)(1)(2)(3, 4)();
 */
