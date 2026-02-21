import { test, expect, describe } from "vitest";

describe("toBe", () => {
  test.fails("object should not be strictly equal", () => {
    expect({ a: 1 }).toBe({ a: 1 });
  });

  test.fails("Array should be strictly equal", () => {
    expect([1, 2, 3]).toBe([1, 2, 3]);
  });

  test.fails("functions should be strictly equal", () => {
    expect(() => {}).toBe(() => {});
  });
});

describe("toEqual", () => {
  test("similar objects should pass with #toEqual", () => {
    expect({ a: 1 }).toEqual({ a: 1 });
  });

  test("similar nested objects should pass with #toEqual", () => {
    expect({ a: 1, b: { c: 2 } }).toEqual({ a: 1, b: { c: 2 } });
  });

  test("similar array should pass with #toEqual", () => {
    expect([1, 2, 3]).toEqual([1, 2, 3]);
  });

  test("similar multi-dimensional array should pass with #toEqual", () => {
    expect([1, 2, 3, [4]]).toEqual([1, 2, 3, [4]]);
  });

  test("function should be strictly equal if compared by reference", () => {
    const fn = () => {};
    expect(fn).toEqual(fn);
  });

  test("should pass if two numbers adds up correctly", () => {
    // expect(0.1 + 0.2).toEqual(0.3);
    expect(0.1 + 0.2).toBeCloseTo(0.3);
  });
});
