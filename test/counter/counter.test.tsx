// @vitest-environment happy-dom
import React from "react";
import userEvent from "@testing-library/user-event";
import { screen, render } from "@testing-library/react";
import { expect, it, test } from "vitest";
import Counter from "./index";

test("it should render the component", () => {
  render(<Counter />);
  screen.debug(document.body);
});

test.todo(
  "it should increment when increment button is clicked",
  async () => {}
);
