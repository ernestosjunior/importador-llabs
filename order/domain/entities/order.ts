import { Product } from "./product";

export type Order = {
  order_id: number;
  date: string;
  total: string;
  products: Product[];
};
