import type { Orders } from "../../ports/output/orders";
import { parseLegacyFile } from "../parsers/legacy-file";
import { aggregateRows } from "../../domain/services/aggregate-rows";

export class OrdersRepository implements Orders {
  async aggregateFromFile(content: string) {
    return aggregateRows(parseLegacyFile(content));
  }
}
