export const log = (
  channel: "log" | "error" | "info" | "warn",
  ...arg: unknown[]
) => {
  console[channel](arg);
};
