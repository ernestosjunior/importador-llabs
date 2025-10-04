import type { UserAggregate } from "../../domain/entities/user-aggregate";

export interface Orders {
  aggregateFromFile(content: string): Promise<UserAggregate[]>;
}
