import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      $components: path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    setupFiles: "./test/setup.ts",
  },
});
