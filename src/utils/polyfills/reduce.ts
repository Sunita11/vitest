// reduce polyfill
declare global {
  interface Array<T> {
    reduceCustom<U>(
      cb: (arg: U, item: T, index: number, arr: T[]) => U,
      initialValue: U
    ): U;
  }
}

Array.prototype.reduceCustom = function <T, U>(
  this: T[],
  cb: (arg: U, item: T, index: number, array: T[]) => U,
  initialValue: U
) {
  let accumulator = initialValue;
  let i = 0;

  while (i < this.length) {
    accumulator = cb(accumulator, this[i], i, this);
    i++;
  }

  return accumulator;
};

type NestedNumberArray = (number | NestedNumberArray)[];

function flatten(arr: NestedNumberArray): number[] {
  return arr.reduceCustom<number[]>(
    (acc, item) => acc.concat(Array.isArray(item) ? flatten(item) : item),
    []
  );
}
const arr = [1, 2, [3, 4, [5, 6], 7]];
console.log(flatten(arr)); // [1,2,3,4,5,6,7]
