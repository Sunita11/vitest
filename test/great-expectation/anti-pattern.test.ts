import { test, expect } from "vitest";

test("Asycnhronous code accidentally passes", () => {
  setTimeout(() => {
    expect(false).toBe(true);
  }, 1000);
});

test("test has 0 expectations", () => {
  expect.assertions(0);
  setTimeout(() => {
    expect(false).toBe(true);
  }, 1000);
});
