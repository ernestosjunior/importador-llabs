import { describe, it, expect } from "vitest";
import { PurchaseDate } from "./purchase-date";

describe("Domain - ValueObjects - PurchaseDate", () => {
  describe("fromYYYYMMDD", () => {
    it("should return a PurchaseDate instance with value yyyy-mm-dd", () => {
      const date = PurchaseDate.fromYYYYMMDD('20251003')

      expect(date).toBe("2025-10-03");
    });
  });
});
