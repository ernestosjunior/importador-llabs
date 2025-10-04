import { describe, it, expect } from "vitest";
import { parseLegacyFile } from "./legacy-file";

const mockFile = `0000000088                             Terra Daniel DDS00000008360000000003     1899.0220210909
0000000103                                 Gail Bradtke00000009660000000005     1564.2120210507
0000000083                          Frances Satterfield00000007910000000006      224.7520211122
`;

describe("Adapters - Parsers - ParseLegacyFile", () => {
  it("should return empty array value", () => {
    const out = parseLegacyFile("");

    expect(out).toEqual([]);
  });

  it("should return a RowsProps", () => {
    const out = parseLegacyFile(mockFile);

    expect(out[0]).toMatchObject({
      order_id: expect.any(Number),
      user_name: expect.any(String),
      product_id: expect.any(Number),
      product_value: expect.any(String),
      purchase_date: expect.any(String),
    });
  });

  it("should return parsed legacy file", () => {
    const out = parseLegacyFile(mockFile);

    expect(out).toHaveLength(3);
  });
});
