/// <reference types="vitest" />
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "~encore": path.resolve(__dirname, "./encore.gen"),
    },
  },
  test: {
    coverage: {
      provider: "v8",
      exclude: ["encore.gen"],
      reporter: ["text", "html", "lcov"],
    },
  },
});
