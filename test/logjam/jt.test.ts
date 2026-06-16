import { test, expect, vi } from "vitest";
import { log } from "./log";
// third-party mocking
// vi.mock("axios", ()=>{
// return {}
// })
test("it spies on the multiply method", () => {
  const mock = vi.fn((x?: string) => {
    if (x) return x.repeat(3);
  });

  mock();
  mock();
  const result = mock("were");

  // vi.spyOn(console, "log")
  vi.spyOn(console, "log").mockImplementation(() => {});

  log("log", 1, 2, 3);

  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenLastCalledWith("were");

  expect(result).toMatchInlineSnapshot('"werewerewere"');
});
