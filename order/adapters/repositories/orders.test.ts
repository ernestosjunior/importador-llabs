import { describe, it, expect, vi, beforeEach } from "vitest";
import { OrdersRepository } from "./orders";
import { parseLegacyFile } from "../parsers/legacy-file";
import { aggregateRows } from "../../domain/services/aggregate-rows";

vi.mock("../parsers/legacy-file", () => ({
  parseLegacyFile: vi.fn(),
}));
vi.mock("../../domain/services/aggregate-rows", () => ({
  aggregateRows: vi.fn(),
}));

describe("Adapters - Repositories - Orders", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call parser with file content and pass rows to aggregate", async () => {
    const repo = new OrdersRepository();
    const content = "FILE_CONTENT";

    const mockedRows = [
      {
        user_id: 1,
        user_name: "Zarelli",
        order_id: 123,
        product_id: 111,
        product_value: "512.24",
        purchase_date: "2021-12-01",
      },
    ];

    const mockedAgg = [
      {
        user_id: 1,
        name: "Zarelli",
        orders: [
          {
            order_id: 123,
            date: "2021-12-01",
            total: "512.24",
            products: [{ product_id: 111, value: "512.24" }],
          },
        ],
      },
    ];

    (parseLegacyFile as any).mockReturnValue(mockedRows);
    (aggregateRows as any).mockReturnValue(mockedAgg);

    const out = await repo.aggregateFromFile(content);

    expect(parseLegacyFile).toHaveBeenCalledTimes(1);
    expect(parseLegacyFile).toHaveBeenCalledWith(content);

    expect(aggregateRows).toHaveBeenCalledTimes(1);
    expect(aggregateRows).toHaveBeenCalledWith(mockedRows);

    expect(out).toBe(mockedAgg);
  });

  it("should bubble up errors from parser", async () => {
    const repo = new OrdersRepository();
    (parseLegacyFile as any).mockImplementation(() => {
      throw new Error("bad file");
    });

    await expect(repo.aggregateFromFile("X")).rejects.toThrow("bad file");
    
    expect(aggregateRows).not.toHaveBeenCalled();
  });
});
