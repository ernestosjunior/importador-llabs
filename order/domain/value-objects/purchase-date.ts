export class PurchaseDate {
  static fromYYYYMMDD(yyyymmdd: string): string {
    const y = yyyymmdd.slice(0, 4);
    const m = yyyymmdd.slice(4, 6);
    const d = yyyymmdd.slice(6, 8);
    return `${y}-${m}-${d}`;
  }
}
