import Button from "@/components/Button";
import CartItemCard from "@/components/CartItemCard";
import QtyCounter from "@/components/QtyCounter";
import { Minus, Plus, Trash, Trash2 } from "lucide-react";
import Image from "next/image";

const Cart = () => {
  return (
    <>
      <div className="mt-16 hidden overflow-x-auto  px-10 sm:block md:px-20 lg:px-52 2xl:px-96">
        <h1 className="mx-5 mb-10 text-2xl font-[500] xl:mx-6">Cart</h1>

        {/* Heading */}
        <div className="grid grid-cols-4 py-4">
          <div className="col-span-2 flex items-center gap-3">
            <div className="tooltip tooltip-left" data-tip="Select all">
              <input type="checkbox" className="checkbox checkbox-sm" />
            </div>
            <h3 className="text-[0.6rem] uppercase text-neutral-400">
              Product
            </h3>
          </div>
          <div className="col-span-1 flex justify-center">
            <h3 className="relative right-4 text-[0.6rem] uppercase text-neutral-400">
              Quantity
            </h3>
          </div>
          <div className="col-span-1 flex justify-end">
            <h3 className="text-[0.6rem] uppercase text-neutral-400">Price</h3>
          </div>
        </div>

        {/*  */}
        <div className="grid grid-cols-4 border-t border-neutral-200 py-6">
          <div className="col-span-2 flex items-start gap-3">
            <input type="checkbox" className="checkbox checkbox-sm" />
            <CartItemCard />
            <div>
              <div className="text-sm font-[500] text-main-text">
                Headphone Headphone high{" "}
              </div>
              <div className="text-[0.6rem] opacity-50">Brown</div>
            </div>
          </div>
          <div className="col-span-1 flex flex-col items-center gap-2">
            <QtyCounter />
            <div className="flex cursor-pointer items-center gap-1 text-xs">
              <Trash2 width={14} height={14} />
              <p>Remove item</p>
            </div>
          </div>
          <div className=" col-span-1 flex justify-end">
            <h3 className="text-sm">$200</h3>
          </div>
        </div>
        {/*  */}
        <div className="grid grid-cols-4 border-t border-neutral-200 py-6">
          <div className="col-span-2 flex items-start gap-3">
            <input type="checkbox" className="checkbox checkbox-sm" />
            <CartItemCard />
            <div>
              <div className="text-sm font-[500] text-main-text">
                Headphone{" "}
              </div>
              <div className="text-[0.6rem] opacity-50">Brown</div>
            </div>
          </div>
          <div className="col-span-1 flex flex-col items-center gap-2">
            <QtyCounter />
            <div className="flex cursor-pointer items-center gap-1 text-xs">
              <Trash2 width={14} height={14} />
              <p>Remove item</p>
            </div>
          </div>
          <div className=" col-span-1 flex justify-end">
            <h3 className="text-sm">$200</h3>
          </div>
        </div>
        {/*  */}
        <div className="mt-20 flex flex-col items-end gap-3">
          <input
            type="text"
            className="w-32 border border-main-text px-2 py-1 text-right text-sm font-[600]"
            value={`$${400}`}
          />
          <Button text="Check out" className="btn-sm w-32 text-xs font-[600]" />
        </div>
      </div>

      {/* Mobile version of Cart */}
      <div className="mt-16 block px-2 min-[302px]:px-10 sm:hidden">
        <h1 className="mx-5 mb-10 text-2xl font-[500] xl:mx-6">Cart</h1>

        <div className="tooltip tooltip-right" data-tip="Select all">
          <input type="checkbox" className="checkbox checkbox-sm" />
        </div>

        {/*  */}
        <div className="border-t border-neutral-200 py-6">
          <div className="col-span-2 flex items-start gap-3">
            <input type="checkbox" className="checkbox checkbox-sm" />
            <CartItemCard />
            <div className="flex flex-col items-start gap-3">
              <section>
                <div className="text-sm font-[500] text-main-text">
                  Headphone Headphone high{" "}
                </div>
                <div className="text-[0.6rem] opacity-50">Brown</div>
              </section>
              <section>
                <div className="col-span-1 flex  flex-col gap-2">
                  <QtyCounter />
                  <div className="cursor-pointer text-xs">
                    <Trash2 width={14} height={14} />
                  </div>
                </div>
              </section>
              <section>
                <h3 className="text-sm">$200</h3>
              </section>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="border-t border-neutral-200 py-6">
          <div className="col-span-2 flex items-start gap-3">
            <input type="checkbox" className="checkbox checkbox-sm" />
            <CartItemCard />
            <div className="flex flex-col items-start gap-3">
              <section>
                <div className="text-sm font-[500] text-main-text">
                  Headphone Headphone high{" "}
                </div>
                <div className="text-[0.6rem] opacity-50">Brown</div>
              </section>
              <section>
                <div className="col-span-1 flex  flex-col gap-2">
                  <QtyCounter />
                  <div className="cursor-pointer text-xs">
                    <Trash2 width={14} height={14} />
                  </div>
                </div>
              </section>
              <section>
                <h3 className="text-sm">$200</h3>
              </section>
            </div>
          </div>
        </div>

        {/*  */}
        <div className="mt-10 flex flex-col items-end gap-3">
          <input
            type="text"
            className="w-32 border border-main-text px-2 py-1 text-right text-sm font-[600]"
            value={`$${400}`}
          />
          <Button text="Check out" className="btn-sm w-32 text-xs font-[600]" />
        </div>
      </div>
    </>
  );
};

export default Cart;
