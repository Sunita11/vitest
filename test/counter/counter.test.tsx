// @vitest-environment happy-dom
import React from "react";
import { screen } from "@testing-library/react";
import { render } from "./../utilities";
import { expect, test } from "vitest";
import Counter from "./index";

test("it should render the component", () => {
  render(<Counter />);
  screen.debug(document.body);
});

test("it should increment when increment button is clicked", async () => {
  const { user } = render(<Counter />);
  const currentCount = screen.getByTestId("current-count");
  expect(currentCount).toHaveTextContent("0");
  const btn = screen.getByRole("button", { name: "Increment" });
  await user.click(btn);
  expect(currentCount).toHaveTextContent("1");
});
