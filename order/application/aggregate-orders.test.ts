import { describe, it, expect } from "vitest";
import { AggregateOrders } from "./aggregate-orders";

describe("AggregateOrders", () => {
  it("should return empty array when no users", async () => {
    const mockSource = {
      aggregateFromFile: async (content: string) => [],
    };
    const aggregateOrders = new AggregateOrders(mockSource);
    const result = await aggregateOrders.execute("dummy content", {});
    expect(result).toEqual([]);
  });

  it("should filter orders by order_id", async () => {
    const mockSource = {
      aggregateFromFile: async (content: string) => [
        {
          user_id: 1,
          name: "User One",
          orders: [
            {
              order_id: 1,
              total: "0.00",
              date: "2023-01-01",
              products: [],
            },
            {
              order_id: 2,
              date: "2023-01-02",
              products: [],
              total: "0.00",
            },
          ],
        },
        {
          user_id: 2,
          name: "User Two",
          orders: [
            {
              order_id: 3,
              date: "2023-01-03",
              products: [],
              total: "0.00",
            },
          ],
        },
      ],
    };
    const aggregateOrders = new AggregateOrders(mockSource);
    const result = await aggregateOrders.execute("dummy content", {
      order_id: 1,
    });

    expect(result).toEqual([
      {
        user_id: 1,
        name: "User One",
        orders: [
          { order_id: 1, date: "2023-01-01", products: [], total: "0.00" },
        ],
      },
    ]);
  });

  it("should filter orders by date range", async () => {
    const mockSource = {
      aggregateFromFile: async (content: string) => [
        {
          user_id: 1,
          name: "User One",
          orders: [
            {
              order_id: 1,
              total: "0.00",
              date: "2023-01-01",
              products: [],
            },
            {
              order_id: 2,
              date: "2023-01-05",
              products: [],
              total: "0.00",
            },
          ],
        },
        {
          user_id: 2,
          name: "User Two",
          orders: [
            {
              order_id: 3,
              date: "2023-01-10",
              products: [],
              total: "0.00",
            },
          ],
        },
      ],
    };
    const aggregateOrders = new AggregateOrders(mockSource);
    const result = await aggregateOrders.execute("dummy content", {
      start_date: "2023-01-02",
      end_date: "2023-01-10",
    });

    expect(result).toEqual([
      {
        user_id: 1,
        name: "User One",
        orders: [
          { order_id: 2, date: "2023-01-05", products: [], total: "0.00" },
        ],
      },
      {
        user_id: 2,
        name: "User Two",
        orders: [
          { order_id: 3, date: "2023-01-10", products: [], total: "0.00" },
        ],
      },
    ]);
  });
});
