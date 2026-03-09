import { render as renderComp } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export const render = (
  ui: React.ReactElement,
  options?: Parameters<typeof renderComp>[1]
) => {
  //   const user = userEvent.setup();
  //   const res = renderComp(ui, options);
  return {
    ...renderComp(ui, options),
    user: userEvent.setup(),
  };
};
