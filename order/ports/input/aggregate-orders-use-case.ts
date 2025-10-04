import type { UserAggregate } from "../../domain/entities/user-aggregate";

export type AggregateFilters = {
  order_id?: number;
  start_date?: string;
  end_date?: string;
};

export interface AggregateOrdersUseCase {
  execute(
    content: string,
    filters?: AggregateFilters
  ): Promise<UserAggregate[]>;
}
