import { Order } from "../domain/entities/order";
import { UserAggregate } from "../domain/entities/user-aggregate";
import {
  AggregateFilters,
  AggregateOrdersUseCase,
} from "../ports/input/aggregate-orders-use-case";
import { Orders } from "../ports/output/orders";

export class AggregateOrders implements AggregateOrdersUseCase {
  constructor(private readonly source: Orders) {}

  async execute(
    content: string,
    filters?: AggregateFilters
  ): Promise<UserAggregate[]> {
    let users = await this.source.aggregateFromFile(content);

    const orderId = filters?.order_id;
    const startDate = filters?.start_date;
    const endDate = filters?.end_date;

    if (!orderId && !startDate && !endDate) {
      return users;
    }

    const matchOrder = (order: Order) =>
      (orderId === undefined || order.order_id === orderId) &&
      (!startDate || order.date >= startDate) &&
      (!endDate || order.date <= endDate);

    return users
      .map((user) => ({
        ...user,
        orders: user.orders.filter(matchOrder),
      }))
      .filter((user) => user.orders.length > 0);
  }
}
