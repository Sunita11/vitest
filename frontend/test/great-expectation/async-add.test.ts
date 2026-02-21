import { describe, it, expect } from "vitest";

const addAsynch = (a: number, b: number) => Promise.resolve(a + b);
const onlyEvenNumber = (a: number) => {
  if (a % 2 === 0) return Promise.resolve(a);
  return Promise.reject(a);
};

it.fails("when not used as async", () => {
  const res = addAsynch(2, 3);
  expect(res).toBe(5);
});

it("passes if used with async/wait", async () => {
  const res = await addAsynch(2, 3);
  expect(res).toBe(5);
});
