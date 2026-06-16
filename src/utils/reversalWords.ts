/*
 * Write a function to perform an reversal of words in a sentence JS and execute it as:
 * console.log(reverseWords(“Welcome to ABC Interview!”));
 * Expected console output :- emocleW ot CBA !weivretnI
 */

function reversalWords(str: string): string {
  if (!str) return "";
  const splitStrArr = str.split(" ");
  const res = [];
  for (let i = 0; i < splitStrArr.length; i++) {
    const word = splitStrArr[i];
    if (word) {
      const revW = Array.from(word).reverse().join("");
      res.push(revW);
    }
  }
  return res.join(" ");
}

reversalWords("Welcome to ABC Interview!");

/*
 * Write a function to find the largest number in an array of arrays?
 * console.log(largest([[7,2,4],[9,2,3],[44,77,6],[300,50,69]]));
 * Expected console output :- [7, 9, 77, 300]
 */

function findMax(arr: number[][]): number[] {
  const result: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    const itemArr = arr[i];
    let max = itemArr[0];
    for (let j = 1; j < itemArr.length; j++) {
      max = max < itemArr[j] ? itemArr[j] : max;
    }
    result.push(max);
  }

  return result;
}

console.log(
  findMax([
    [7, 2, 4],
    [9, 2, 3],
    [44, 77, 6],
    [300, 50, 69],
  ])
);
