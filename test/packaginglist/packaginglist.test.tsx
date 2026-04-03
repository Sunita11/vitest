// @vitest-environment happy-dom
import React from "react";
import { it, expect, test } from "vitest";
import { screen, waitFor } from "@testing-library/react";

import { render } from "./../utilities";
import PackagingList from "./../../src/components/packaging";

it("it should render the component", () => {
  render(<PackagingList />);
  // screen.debug(document.body);
});

it("it should have correct title", () => {
  render(<PackagingList />);
  screen.getByText("Packing List");
});
it("it should have an input field for adding item", () => {
  render(<PackagingList />);
  screen.getByLabelText("New Item Name");
  screen.getAllByPlaceholderText("Enter Item");
});
it("has an add new item button with disabled state", () => {
  render(<PackagingList />);
  const inpField = screen.getByPlaceholderText("Enter Item");
  const button = screen.getByRole("button", { name: "Add Item" });
  expect(inpField).toHaveValue("");
  expect(button).toBeDisabled();
});
it("New item button should be enabled when user enters a new item", async () => {
  const { user } = render(<PackagingList />);
  const inpField = screen.getByPlaceholderText("Enter Item");
  const button = screen.getByRole("button", { name: "Add Item" });
  await user.type(inpField, "Macbook");

  expect(button).toBeEnabled();
});

it("add a new item on click of Add Item button", async () => {
  const { user } = render(<PackagingList />);
  const inpField = screen.getByPlaceholderText("Enter Item");
  const button = screen.getByRole("button", { name: "Add Item" });
  await user.type(inpField, "ipad pro");

  expect(button).toBeEnabled();
  await user.click(button);

  expect(screen.getByLabelText("ipad pro")).not.toBeChecked();
  // empty
  expect(inpField).toHaveValue("");
  expect(button).toBeDisabled();
});

it("Remove an item", async () => {
  const { user } = render(<PackagingList />);
  const inpField = screen.getByPlaceholderText("Enter Item");
  const button = screen.getByRole("button", { name: "Add Item" });
  await user.type(inpField, "android");

  expect(button).toBeEnabled();
  await user.click(button);

  expect(screen.getByLabelText("android")).not.toBeChecked();
  const removeButton = screen.getByRole("button", { name: "Remove" });
  await user.click(removeButton);

  //   waitFor(() => expect(removeButton).not.toBeInTheDocument());
});
