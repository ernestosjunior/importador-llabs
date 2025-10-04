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
    const users = await this.source.aggregateFromFile(content);

    const start = filters?.start_date ?? "0000-01-01";
    const end = filters?.end_date ?? "9999-12-31";

    return users.map((user) => ({
      ...user,
      orders: user.orders.filter(
        (order) =>
          (!filters?.order_id || order.order_id === filters.order_id) &&
          order.date >= start &&
          order.date <= end
      ),
    }));
  }
}
