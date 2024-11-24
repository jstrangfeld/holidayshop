import { SVGProps, useState } from "react";

import ItemConstructor, { type Item } from "./Item";
import ItemsActions from "./ItemActions";
import QuantityEditor from "./QuantityEditor";

import data from "./data.json";

const codes = [...new Set(data.map((item) => item.code))];

function App() {
  const [register, setRegister] = useState<Item[]>([]);
  const [budget, setBudget] = useState(0);

  const total = register.reduce(
    (prev, next) =>
      (next.status === "active" ? next.price * next.quantity : 0) + prev,
    0
  );
  const remaining = (isNaN(budget) ? 0 : budget) - total;

  function addToRegister(code: number, name?: string) {
    setRegister([...register, ItemConstructor(name, code, 1)]);
  }

  function removeFromRegister(index: number) {
    setRegister(register.filter((_, i) => i !== index));
  }

  function updateItemQuantity(index: number, quantity: number) {
    const newRegister = register.slice();
    newRegister[index].quantity = quantity;
    setRegister(newRegister);
  }

  function updateItemStatus(index: number, status: Item["status"]) {
    const newRegister = register.slice();
    newRegister[index].status = status;
    setRegister(newRegister);
  }

  return (
    <main className="h-svh w-svw bg-base-100 text-base-content flex flex-col overflow-x-hidden">
      <section className="overflow-y-auto flex-1 overflow-x-clip">
        <table className="table">
          <tbody>
            {register.length ? (
              register.map((item, i) => (
                <tr
                  key={i}
                  className={item.status === "active" ? "" : "bg-base-300"}
                >
                  <td
                    className={
                      item.status === "active"
                        ? "text-2xl w-full"
                        : "text-2xl w-full line-through italic opacity-70"
                    }
                  >
                    {item.code} {item.name}
                  </td>
                  <td>
                    <QuantityEditor
                      item={item}
                      index={i}
                      updateItemQuantity={updateItemQuantity}
                    />
                  </td>
                  <td>
                    <div className="text-base-content text-xs opacity-70 uppercase">
                      Total
                    </div>
                    <span
                      className={
                        item.status === "canceled"
                          ? "line-through italic opacity-70"
                          : ""
                      }
                    >
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </td>
                  <td>
                    <ItemsActions
                      item={item}
                      index={i}
                      updateItemStatus={updateItemStatus}
                      removeFromRegister={removeFromRegister}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="h-[75vh] grid items-center text-center text-lg text-neutral-content">
                  Tap + to add new items
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
      <div className="navbar bg-base-200 text-base-content gap-2 justify-between z-10">
        <div>
          <details className="dropdown dropdown-top">
            <summary className="btn btn-lg btn-circle btn-primary">
              <PlusIcon className="fill-current w-[24px] h-[24px]" />
            </summary>
            <div className="dropdown-content bg-base-300 card card-compact z-10 p-2 min-w-xs max-w-full shadow">
              <div className="card-body">
                <ul className="grid grid-cols-[repeat(auto-fill,minmax(3.3rem,1fr))] gap-2 max-w-full">
                  {codes.map((code) => (
                    <li key={code}>
                      <button
                        className="btn btn-lg btn-outline"
                        onClick={() => addToRegister(code)}
                      >
                        {code}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </details>
        </div>
        <div className="flex justify-between gap-2">
          <details className="dropdown dropdown-top">
            <summary className="badge badge-lg badge-primary text-primary-content sm:px-4 py-2 font-bold flex flex-col gap-0">
              <div className="text-xs opacity-70 uppercase min-w-max flex gap-1">
                Budget
              </div>
              <div>${budget.toFixed(2)}</div>
            </summary>
            <div className="dropdown-content card bg-base-300 px-1">
              <div className="card-content">
                <input
                  className="input input-ghost w-18"
                  name="budget"
                  type="number"
                  placeholder="$0.00"
                  value={budget}
                  onChange={(e) => setBudget(parseFloat(e.target.value))}
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                />
              </div>
            </div>
          </details>
          <div className="badge badge-lg badge-success text-success-content sm:px-4 py-2 font-bold flex flex-col gap-0">
            <div className="text-xs opacity-70 uppercase">Remain</div>
            <div>${remaining.toFixed(2)}</div>
          </div>
          <div className="badge badge-lg badge-accent text-accent-content sm:px-4 py-2 font-bold flex flex-col gap-0">
            <div className="text-xs opacity-70 uppercase">Total</div>
            <div>${total.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;

function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </svg>
  );
}
