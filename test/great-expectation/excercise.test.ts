import { test, describe, expect, it } from "vitest";

it.todo("should pass if two number would add", () => {
  expect(0.2 + 0.1).toBe(0.3);
});

describe("create person", () => {
  it.todo(
    "should create an instance of person",

    () => {
      const person = {
        role: "admin",
        status: ["check"],
      };
      expect.hasAssertions();
      //   expect(person).instanceof(Person)
      expect(person.role).toContain("admin");
      expect(person.role).not.toContain("admin");
    }
  );
});
