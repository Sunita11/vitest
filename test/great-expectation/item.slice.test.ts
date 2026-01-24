import reducer, {
  add,
  toggle,
  update,
  remove,
  markAllAsUpacked,
} from "./item-slice";
import { describe, it, expect } from "vitest";

it("returns an empty array as the initial state", () => {
  expect(reducer(undefined, { type: "noop" })).toEqual([]);
});

it("support adding an item with correct name", () => {
  expect.hasAssertions();
  const result = reducer([], add({ name: "iphone" }));
  expect(result).toEqual([expect.objectContaining({ name: "iphone" })]);
});

it("prefix ids with item-", () => {
  expect.hasAssertions();
  const result = reducer([], add({ name: "iphone" }));
  expect(result).toEqual([
    expect.objectContaining({ id: expect.stringMatching(/^item-/) }),
  ]);
});

it("default new items to a packed status of false", () => {
  expect.hasAssertions();
  const result = reducer([], add({ name: "iphone" }));
  const [item] = result;
  expect(result.length).toBe(1);
  expect(item.packed).toBe(false);
});

it.todo("support removing an item", () => {
  expect.hasAssertions();
  const state = [
    {
      id: "1",
      name: "iphone",
      packed: false,
    },
  ];
  const result = reducer(state, remove({ id: "1" }));
  expect(result).not.toContain(expect.objectContaining({ id: "1" }));
});

it.todo("support update an item", () => {
  expect.hasAssertions();
  const result = reducer([], update({ id: "1", name: "tab" }));
});

it.todo("support toggling an item", () => {
  expect.hasAssertions();
  const result = reducer([], toggle({ id: "1" }));
});
