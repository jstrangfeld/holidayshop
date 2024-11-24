import { SVGProps } from "react";
import { type Item } from "./Item";

export default function ItemsActions({
  item,
  index,
  updateItemStatus,
  removeFromRegister,
}: {
  item: Item;
  index: number;
  updateItemStatus: (index: number, status: typeof item.status) => void;
  removeFromRegister: (index: number) => void;
}) {
  return (
    <div className="flex gap-4 w-min">
      <label className="swap">
        <input
          type="checkbox"
          onChange={(e) =>
            updateItemStatus(index, e.target.checked ? "active" : "canceled")
          }
          checked={item.status === "active"}
        />
        <CheckboxCheckedIcon className="swap-on w-[21px] h-[21px] fill-success" />
        <CheckboxUncheckedIcon className="swap-off w-[21px] h-[21px] fill-success" />
      </label>

      <div>
        <div className="text-base-content text-xs opacity-70 uppercase"> </div>
        <details className="dropdown dropdown-bottom dropdown-end">
          <summary className="btn btn-ghost">
            <MoreIcon className="fill-base-content w-[21px] h-[21px]" />
          </summary>
          <ul className="menu dropdown-content z-10 shadow bg-base-200">
            <li>
              <button
                className="btn-ghost"
                onClick={() => removeFromRegister(index)}
              >
                Delete
              </button>
            </li>
          </ul>
        </details>
      </div>
    </div>
  );
}

function CheckboxCheckedIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-9 14-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  );
}

function CheckboxUncheckedIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M19 5v14H5V5h14m0-2H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
    </svg>
  );
}

function MoreIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
  );
}
