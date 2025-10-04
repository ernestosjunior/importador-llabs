import type { Product } from "../entities/product";
import type { UserAggregate } from "../entities/user-aggregate";
import { Money } from "../value-objects/money";

export type RowsProps = {
  user_id: number;
  user_name: string;
  order_id: number;
  product_id: number;
  product_value: string;
  purchase_date: string;
};

export function aggregateRows(rows: RowsProps[]): UserAggregate[] {
  const userMap = new Map<number, UserAggregate>();

  for (const row of rows) {
    const user = userMap.get(row.user_id) ?? {
      user_id: row.user_id,
      name: row.user_name.trim(),
      orders: [],
    };
    const order = user.orders.find((order) => order.order_id === row.order_id);
    const product: Product = {
      product_id: row.product_id,
      value: row.product_value,
    };

    if (!order) {
      user.orders.push({
        order_id: row.order_id,
        date: row.purchase_date,
        total: "0.00",
        products: [product],
      });
    } else {
      order.products.push(product);
    }

    userMap.set(row.user_id, user);
  }

  for (const user of userMap.values()) {
    for (const order of user.orders) {
      const total = order.products
        .map((p) => Money.fromDecimalString(p.value))
        .reduce((acc, m) => acc.add(m), Money.fromDecimalString("0.00"));

      order.total = total.toDecimalString();
    }
  }

  return Array.from(userMap.values())
    .sort((a, b) => a.user_id - b.user_id)
    .map((user) => ({
      ...user,
      orders: user.orders.sort(
        (a, b) => b.date.localeCompare(a.date) || a.order_id - b.order_id
      ),
    }));
}
