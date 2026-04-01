// @vitest-environment happy-dom
import React from "react";
import { screen } from "@testing-library/react";
import { render } from "./../utilities";
import { expect, test } from "vitest";
import Counter from "./index";

test("it should render the component", () => {
  render(<Counter />);
  // screen.debug(document.body);
});

test("it should render the component with initial count", () => {
  render(<Counter initialCount={4000} />);
  const currentCount = screen.getByTestId("current-count");
  expect(currentCount).toHaveTextContent("4000");
});

test("it should increment when increment button is clicked", async () => {
  const { user } = render(<Counter />);
  const currentCount = screen.getByTestId("current-count");
  expect(currentCount).toHaveTextContent("0");
  const btn = screen.getByRole("button", { name: "Increment" });
  await user.click(btn);
  expect(currentCount).toHaveTextContent("1");
});

test("it should decrement when Decrement button is clicked", async () => {
  const { user } = render(<Counter />);
  const currentCount = screen.getByTestId("current-count");
  expect(currentCount).toHaveTextContent("0");
  const btn = screen.getByRole("button", { name: "Increment" });
  const decrementbtn = screen.getByRole("button", { name: /decrement/i });

  await user.click(btn);
  await user.click(btn);
  expect(currentCount).toHaveTextContent("2");

  await user.click(decrementbtn);
  expect(currentCount).toHaveTextContent("1");
});

test("it should reset the count when 'Reset' button is clicked", async () => {
  const { user } = render(<Counter initialCount={4} />);
  const currentCount = screen.getByTestId("current-count");
  expect(currentCount).toHaveTextContent("4");

  const incrementButton = screen.getByRole("button", { name: /increment/i });
  await user.click(incrementButton);
  await user.click(incrementButton);

  expect(currentCount).toHaveTextContent("6");
  await user.click(screen.getByRole("button", { name: /reset/i }));
  expect(currentCount).toHaveTextContent("0");
});
