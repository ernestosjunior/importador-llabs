import { Order } from "./order";

export type UserAggregate = {
  user_id: number;
  name: string;
  orders: Order[];
};
