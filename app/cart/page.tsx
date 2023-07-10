// @ts-nocheck
"use client";
import Button from "@/components/Button";
import CartItemCard from "@/components/CartItemCard";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import QtyCounter from "@/components/QtyCounter";
import { Minus, Plus, Trash, Trash2 } from "lucide-react";
import Image from "next/image";
import baseUrl from "@/baseUrl/baseUrl";
import { useEffect, useState } from "react";
import { CartProductsType } from "@/types/ProductType";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

const Cart = () => {
  const session = useSession();
  const userID = session?.data?.user?.email;
  const router = useRouter();

  const fetcher = (...args: any) => fetch(...args).then((res) => res.json());

  useEffect(() => {
    session?.status === "unauthenticated" && router.push("/login");
  }, [router, session]);

  const [product_id, setProductId] = useState("");
  const [cart_id, setCartId] = useState("");

  const { data, mutate, error, isLoading } = useSWR(
    `${baseUrl}/api/cart?userID=${userID}`,
    fetcher
  );

  const updateSelected = async (is_selected, product_id, cart_id) => {
    try {
      await axios.put(
        `${baseUrl}/api/cart/${cart_id}?product_id=${product_id}`,
        {
          is_selected
        },
       
      );
    } catch (error) {
      console.log(error);
    }
  };

  const removeProduct = async (product_id, cart_id) => {
    try {
      await axios.delete(
        `${baseUrl}/api/cart/${cart_id}?product_id=${product_id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const increaseQty = async (qty, product_id, cart_id) => {
    try {
      await axios.put(
        `${baseUrl}/api/cart/${cart_id}?product_id=${product_id}&type=increase`,
        {
          quantity: qty,
        },
      
      );
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseQty = async (qty, product_id, cart_id) => {
    try {
      await axios.put(
        `${baseUrl}/api/cart/${cart_id}?product_id=${product_id}&type=decrease`,
        {
          quantity: qty,
        },
     
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateQty = async (qty, product_id, cart_id) => {
    try {
      await axios.put(
        `${baseUrl}/api/cart/${cart_id}?product_id=${product_id}&type=decrease`,
        {
          quantity: qty,
        },
      
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateSelected = async (is_selected, prodId, cartId) => {
    setProductId(prodId);
    setCartId(cartId);

    //  const is_selected = e.target.checked
    console.log(is_selected)

    const updatedData = {
      ...data,
      products: data.products.map((product) => {
        if (product._id === product_id) {
          return {
            ...product,
            is_selected: !is_selected,
          };
        }
        return product;
      }),
    };

    try {
      // Update the local data optimistically
      mutate(updatedData, false);

      // Call the updateSelected function to make the actual request
      await updateSelected(is_selected, product_id, cart_id);

      // Revalidate the data to fetch the latest updates from the server
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveProduct = async (prodId, cartId) => {
    setProductId(prodId); // sets product_id
    setCartId(cartId); // sets cart_id

    const updatedData = {
      ...data,
      products: data.products.filter((product) => product._id !== product_id),
    };

    try {
      mutate(updatedData, false); // false -> do not revalidate immediately

      await removeProduct(product_id, cart_id);

      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleIncreaseQty = async (qty, prodId, cartId) => {
    setProductId(prodId); // sets product_id
    setCartId(cartId); // sets cart_id

    const updatedData = {
      ...data,
      products: data?.products?.map((product) => {
        if (product._id === product_id) {
          return {
            ...product,
            quantity: qty + 1,
          };
        }
        return product;
      }),
    };

    try {
      mutate(updatedData, false); // false -> do not revalidate immediately

      await increaseQty(qty, product_id, cart_id);

      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecreaseQty = async (qty, prodId, cartId) => {
    setProductId(prodId); // sets product_id
    setCartId(cartId); // sets cart_id

    const updatedData = {
      ...data,
      products: data.products.map((product) => {
        if (product._id === product_id) {
          return {
            ...product,
            quantity: qty - 1,
          };
        }
        return product;
      }),
    };

    try {
      mutate(updatedData, false); // false -> do not revalidate immediately

      await decreaseQty(qty, product_id, cart_id);

      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeQty = async (e, qty, prodId, cartId) => {
    setProductId(prodId); // sets product_id
    setCartId(cartId); // sets cart_id

    const updatedData = {
      ...data,
      products: data.products.map((product) => {
        if (product._id === product_id) {
          return {
            ...product,
            quantity: e.target.value,
          };
        }
        return product;
      }),
    };

    try {
      mutate(updatedData, false); // false -> do not revalidate immediately

      await updateQty(e.target.value, product_id, cart_id);

      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  if (error)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        {error.message}
      </div>
    );
  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <div>
          <span className="loading loading-ring loading-lg"></span>
        </div>
      </div>
    );

  return (
    <>
      <div className="mt-16 hidden overflow-x-auto  px-10 sm:block md:px-20 lg:px-52 2xl:px-96">
        <h1 className="mx-5 mb-10 text-2xl font-[500] xl:mx-6">Cart</h1>
        {data?.products?.length <= 0 ? (
          <small>
            You have no item in your cart.{" "}
            <Link href="/products" className="underline">
              {" "}
              Add one now.
            </Link>
          </small>
        ) : (
          <>
            <div className="grid grid-cols-4 py-4">
              <div className="col-span-2 flex items-center gap-3">
                <div className="tooltip tooltip-left" data-tip="Select all">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm border-neutral-400 dark:border-neutral-700"
                  />
                </div>
                <h3 className="text-[0.6rem] uppercase text-neutral-700 dark:text-neutral-50">
                  Product
                </h3>
              </div>
              <div className="col-span-1 flex justify-center">
                <h3 className="relative right-4 text-[0.6rem] uppercase text-neutral-700 dark:text-neutral-50">
                  Quantity
                </h3>
              </div>
              <div className="col-span-1 flex justify-end">
                <h3 className="text-[0.6rem] uppercase text-neutral-700 dark:text-neutral-50">
                  Price
                </h3>
              </div>
            </div>

            {data?.products?.map((product: CartProductsType) => {
              return (
                <div
                  key={product?._id}
                  className="grid grid-cols-4 border-t border-neutral-400 py-6"
                >
                  <div className="col-span-2 flex items-start gap-3">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm border-neutral-400 dark:border-neutral-700"
                      checked={product?.is_selected}
                      data-id={product?._id}
                      onClick={() =>
                        handleUpdateSelected(
                          product?.is_selected,
                          product?._id,
                          data?._id
                        )
                      }
                    />
                    <CartItemCard
                      image={product?.product_id?.image}
                      alt={product?.product_id?.name}
                    />
                    <div>
                      <div className="text-sm font-[500] text-main-text dark:text-white">
                        {product?.product_id?.name}
                      </div>
                      <div className="text-[0.6rem] opacity-50">
                        {product?.product_id?.extras}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 flex flex-col items-center gap-2">
                    <QtyCounter
                      quantity={product?.quantity}
                      handleIncreaseQty={() =>
                        handleIncreaseQty(
                          product?.quantity,
                          product?._id,
                          data?._id
                        )
                      }
                      handleDecreaseQty={() =>
                        handleDecreaseQty(
                          product?.quantity,
                          product?._id,
                          data?._id
                        )
                      }

                      handleChangeQty={(e) =>
                        handleChangeQty(
                          e,
                          product?.quantity,
                          product?._id,
                          data?._id
                        )
                      }
                    />
                    <div
                      className="flex cursor-pointer items-center gap-1 text-xs"
                      onClick={() =>
                        handleRemoveProduct(product?._id, data._id)
                      }
                    >
                      <Trash2 width={14} height={14} />
                      <p>Remove item</p>
                    </div>
                  </div>
                  <div className=" col-span-1 flex justify-end">
                    <h3 className="text-sm">{`$${product?.product_id?.price}`}</h3>
                  </div>
                </div>
              );
            })}

            {/*  */}
            <div className="mt-20 flex flex-col items-end gap-3">
              <input
                type="text"
                className="w-32 border border-main-text px-2 py-1 text-right text-sm font-[600] dark:text-neutral-900"
                disabled
                value={`$${data?.total_price?.toFixed(2)}`}
              />
              <Button
                text="Check out"
                className="btn-sm w-32 text-xs font-[600]"
              />
            </div>
          </>
        )}
      </div>

      {/***  Mobile version of Cart ****/}
      <div className="mt-16 block px-2 min-[302px]:px-10 sm:hidden">
        <h1 className="mx-5 mb-10 text-2xl font-[500] xl:mx-6">Cart</h1>
        {data?.products?.length <= 0 ? (
          <small>
            You have no item in your cart.
            <Link href="/products" className="underline">
              {" "}
              Add one now.
            </Link>{" "}
          </small>
        ) : (
          <>
            <div className="tooltip tooltip-right" data-tip="Select all">
              <input
                type="checkbox"
                className="checkbox checkbox-sm border-neutral-400 dark:border-neutral-700"
              />
            </div>

            {/*  */}
            {data?.products?.map((product: CartProductsType) => {
              // const res = await fetch(
              //   `${baseUrl}/api/products/${product?.product_id}`
              // );
              // const product = await res.json();

              return (
                <div
                  key={product?._id}
                  className="border-t border-neutral-400 py-6"
                >
                  <div className="col-span-2 flex items-start gap-3">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm border-neutral-400 dark:border-neutral-700"
                      checked={product?.is_selected}
                      onClick={() =>
                        handleUpdateSelected(
                          product?.is_selected,
                          product?._id,
                          data?._id
                        )
                      }
                    />
                    <CartItemCard
                      image={product?.product_id?.image}
                      alt={product?.product_id?.name}
                    />
                    <div className="flex flex-col items-start gap-3">
                      <section>
                        <div className="text-sm font-[500] text-main-text dark:text-white">
                          {product?.product_id?.name}
                        </div>
                        <div className="text-[0.6rem] opacity-50">
                          {product?.product_id?.extras}
                        </div>
                      </section>
                      <section>
                        <div className="col-span-1 flex  flex-col gap-2">
                          <QtyCounter
                            quantity={product?.quantity}
                            handleIncreaseQty={() =>
                              handleIncreaseQty(
                                product?.quantity,
                                product?._id,
                                data?._id
                              )
                            }
                            handleDecreaseQty={() =>
                              handleDecreaseQty(
                                product?.quantity,
                                product?._id,
                                data?._id
                              )
                            }
                          />
                          <div
                            className="cursor-pointer text-xs"
                            onClick={() =>
                              handleRemoveProduct(product?._id, data._id)
                            }
                          >
                            <Trash2 width={14} height={14} />
                          </div>
                        </div>
                      </section>
                      <section>
                        <h3 className="text-sm">{`$${product?.product_id?.price}`}</h3>
                      </section>
                    </div>
                  </div>
                </div>
              );
            })}

            {/*  */}
            <div className="mt-10 flex flex-col items-end gap-3">
              <input
                type="text"
                className="w-32 border border-main-text px-2 py-1 text-right text-sm font-[600] dark:text-neutral-900"
                value={`$${data?.total_price?.toFixed(2)}`}
              />
              <Button
                text="Check out"
                className="btn-sm w-32 text-xs font-[600]"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
