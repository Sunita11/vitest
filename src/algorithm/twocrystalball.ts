function twoCrystalBall(breaks: boolean[]) {
  const jumpAmount = Math.floor(Math.sqrt(breaks.length));
  let i = jumpAmount;
  for (; i < breaks.length; i += jumpAmount) {
    if (breaks[i]) break;
  }

  i -= jumpAmount;

  for (let j = 0; j < jumpAmount && i < breaks.length; ++j, ++i) {
    if (breaks[i]) return i;
  }
  return -1;
}

function arrangeArraySign(arr: number[]) {
  let low = 0;
  let mid = 0;
  let high = arr.length - 1;
  while (mid <= high) {
    if (arr[mid] < 0) {
      while (arr[low] < 0) low++;
      [arr[low], arr[mid]] = [arr[mid], arr[low]];
      low += 1;
    } else if (arr[mid] > 0) {
      while (arr[high] > 0) high--;
      [arr[mid], arr[high]] = [arr[high], arr[mid]];
      high -= 1;
    }
    mid += 1;
  }

  return arr;
}

console.log(arrangeArraySign([0, -1, 2, -3, 0, 1]));
