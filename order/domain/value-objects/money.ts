export class Money {
  private constructor(private readonly cents: number) {}

  static zero() {
    return new Money(0);
  }

  add(other: Money): Money {
    return new Money(this.cents + other.cents);
  }

  static fromDecimalString(raw: string): Money {
    const s = raw.trim();

    if (!s) return Money.zero();

    if (!s.includes(".")) {
      return new Money(Number(s) * 100);
    }

    let [integer, decimal] = s.split(".");

    integer = integer.replace(/^\s+/, "");
    decimal = decimal.padEnd(2, "0").slice(0, 2);

    return new Money(Number(integer) * 100 + Number(decimal));
  }

  toDecimalString(): string {
    const intPart = Math.floor(this.cents / 100).toString();
    const decPart = (this.cents % 100).toString().padStart(2, "0");
    return `${intPart}.${decPart}`;
  }
}
