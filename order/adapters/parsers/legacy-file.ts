import { RowsProps } from "../../domain/services/aggregate-rows";
import { Money } from "../../domain/value-objects/money";
import { PurchaseDate } from "../../domain/value-objects/purchase-date";

const SCHEMA = {
  user_id: { start: 0, len: 10 as const },
  user_name: { start: 10, len: 45 as const },
  order_id: { start: 55, len: 10 as const },
  product_id: { start: 65, len: 10 as const },
  product_value: { start: 75, len: 12 as const },
  purchase_date: { start: 87, len: 8 as const },
};

const lineSlice = (line: string, start: number, len: number) =>
  line.slice(start, start + len);

const parseLeftSpacePaddedText = (raw: string) => raw.replace(/^\s+/, "");

export function parseLegacyFile(content: string): RowsProps[] {
  const lines = content
    .split(/\r?\n/)
    .map((l) => l.replace(/\s+$/, ""))
    .filter((l) => l.length > 0);

  const output: RowsProps[] = [];

  for (const line of lines) {
    if (line.length < SCHEMA.purchase_date.start + SCHEMA.purchase_date.len)
      continue;

    const user_id = parseInt(
      lineSlice(line, SCHEMA.user_id.start, SCHEMA.user_id.len),
      10
    );
    const user_name = parseLeftSpacePaddedText(
      lineSlice(line, SCHEMA.user_name.start, SCHEMA.user_name.len)
    );
    const order_id = parseInt(
      lineSlice(line, SCHEMA.order_id.start, SCHEMA.order_id.len),
      10
    );
    const product_id = parseInt(
      lineSlice(line, SCHEMA.product_id.start, SCHEMA.product_id.len),
      10
    );
    const product_value = Money.fromDecimalString(
      lineSlice(
        line,
        SCHEMA.product_value.start,
        SCHEMA.product_value.len
      ).trim()
    ).toDecimalString();
    const purchase_date = PurchaseDate.fromYYYYMMDD(
      lineSlice(line, SCHEMA.purchase_date.start, SCHEMA.purchase_date.len)
    );

    output.push({
      user_id,
      user_name,
      order_id,
      product_id,
      product_value,
      purchase_date,
    });
  }

  return output;
}
