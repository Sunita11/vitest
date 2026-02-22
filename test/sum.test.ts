import { expect, it } from "vitest";
const sum = (a: number, b: number) => a + b;

it("Should expect sum", () => {
  expect(sum(2, 4)).toBe(6);
});
