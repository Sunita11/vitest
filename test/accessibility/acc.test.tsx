// @vitest-environment happy-dom
import React from "react";
import { it, expect, test } from "vitest";
import { axe } from "jest-axe";
import { screen, waitFor } from "@testing-library/react";

import { render } from "../utilities";
import PackagingList from "../../src/components/packaging";

it("it should render the component", async () => {
  const { container } = render(<PackagingList />);
  const res = await axe(container);
  expect(res).toHaveNoViolations();
  // screen.debug(document.body);
});
