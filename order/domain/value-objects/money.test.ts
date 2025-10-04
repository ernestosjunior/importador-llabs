import { describe, it, expect } from "vitest";
import { Money } from "./money";

describe("Domain - ValueObjects - Money", () => {
  describe("zero", () => {
    it("should return a Money instance with value 0.00", () => {
      const zero = Money.zero();

      expect(zero.toDecimalString()).toBe("0.00");
    });
  });

  describe("add", () => {
    it("should add two Money values", () => {
      const first = Money.fromDecimalString("10.00");
      const second = Money.fromDecimalString("5.50");

      expect(first.add(second).toDecimalString()).toBe("15.50");
    });
  });

  describe("fromDecimalString", () => {
    it("should parse a string with decimals correctly", () => {
      const m = Money.fromDecimalString("123.45");
      expect(m.toDecimalString()).toBe("123.45");
    });

    it("should handle leading spaces", () => {
      const m = Money.fromDecimalString("   89.1");
      expect(m.toDecimalString()).toBe("89.10");
    });
  });
});
