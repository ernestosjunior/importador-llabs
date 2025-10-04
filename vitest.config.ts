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
      all: true,
      include: ["order/**/*.ts"],
      exclude: ["**/encore.service.ts"],
      reporter: ["text", "html", "lcov"],
    },
  },
});
