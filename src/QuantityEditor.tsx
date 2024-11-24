import { SVGProps, useState } from "react";
import { type Item } from "./Item";

export default function QuantityEditor({
  item,
  index,
  updateItemQuantity,
}: {
  item: Item;
  index: number;
  updateItemQuantity: (index: number, quantity: number) => void;
}) {
  const [active, setActive] = useState<boolean>(false);
  return (
    <div onClick={() => setActive(!active)} className="text-right">
      <div className="text-base-content text-xs opacity-70 uppercase">
        Quantity
      </div>
      <div className="flex gap-2 min-w-max justify-between">
        {active ? (
          <div>
            <PlusCircleIcon
              className="w-[18px] h-[18px] inline-block mr-2"
              onClick={() => updateItemQuantity(index, item.quantity + 1)}
            />
            <MinusCircleIcon
              className="w-[18px] h-[18px] inline-block"
              onClick={() =>
                updateItemQuantity(
                  index,
                  item.quantity > 1 ? item.quantity - 1 : 1
                )
              }
            />
          </div>
        ) : (
          <div>
            <EditIcon className="w-[18px] h-[18px] fill-neutral" />
          </div>
        )}
        <div
          className={
            item.status === "canceled" ? "line-through italic opacity-70" : ""
          }
        >
          {item.quantity}
        </div>
      </div>
    </div>
  );
}

function PlusCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8.01 8.01 0 0 1 0-16 8.01 8.01 0 0 1 0 16z" />
    </svg>
  );
}

function MinusCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M7 11v2h10v-2H7zm5-9a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8.01 8.01 0 0 1 0-16 8.01 8.01 0 0 1 0 16z" />
    </svg>
  );
}

function EditIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </svg>
  );
}
