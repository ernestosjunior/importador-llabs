import { describe, it, expect } from "vitest";
import { aggregateRows, RowsProps } from "./aggregate-rows";

const mockRows: RowsProps[] = [
  {
    user_id: 1,
    user_name: "Zarelli",
    order_id: 123,
    product_id: 111,
    product_value: "512.24",
    purchase_date: "2021-12-01",
  },
  {
    user_id: 2,
    user_name: "Medeiros",
    order_id: 12345,
    product_id: 111,
    product_value: "512.24",
    purchase_date: "2020-12-01",
  },
  {
    user_id: 2,
    user_name: "Medeiros",
    order_id: 12345,
    product_id: 122,
    product_value: "256.24",
    purchase_date: "2020-12-01",
  },
];

describe("Domain - Services - AggregateRows", () => {
  it("should return empty array value", () => {
    const out = aggregateRows([]);

    expect(out).toEqual([]);
  });

  it("should return a UserAggregate", () => {
    const out = aggregateRows([mockRows[0]]);

    expect(out[0]).toMatchObject({
      user_id: expect.any(Number),
      name: expect.any(String),
      orders: expect.any(Array),
    });
  });

  it("should aggregate a single user/order/product", () => {
    const out = aggregateRows([mockRows[0]]);

    const data = out[0];

    expect(out).toHaveLength(1);
    expect(data.orders).toHaveLength(1);
    expect(data.orders[0].products).toHaveLength(1);
    expect(data.orders[0].total).toBe("512.24");
  });

  it("should aggregate multiple users with multiple orders", () => {
    const out = aggregateRows(mockRows);

    expect(out).toHaveLength(2);
    expect(out.find((u) => u.user_id === 1)?.orders[0].total).toBe("512.24");
    expect(out.find((u) => u.user_id === 2)?.orders[0].total).toBe("768.48");
  });
});
