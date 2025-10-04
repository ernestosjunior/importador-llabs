import type { UserAggregate } from "../../domain/entities/user-aggregate";

export type AggregateFilters = {
  orderId?: number;
  startDate?: string;
  endDate?: string;
};

export interface AggregateOrdersUseCase {
  execute(
    content: string,
    filters?: AggregateFilters
  ): Promise<UserAggregate[]>;
}
