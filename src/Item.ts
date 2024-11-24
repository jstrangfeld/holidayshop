import data from "./data.json";

const prices = [...new Set(data.map((item) => item.price))];
const itemLookup: Map<number, number> = new Map();
prices.map((price) =>
  itemLookup.set(
    data.find((item) => item.price === price)?.code as number,
    price
  )
);

export type Item = {
  name?: string;
  code: number;
  quantity: number;
  price: number;
  status: "active" | "canceled";
};

export default function Item(
  name: string = "",
  code: number,
  quantity: number = 1
): Item {
  return {
    name,
    code,
    quantity,
    price: itemLookup.get(code) ?? 0.0,
    status: "active",
  };
}
