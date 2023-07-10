// @ts-nocheck
"use client";
import baseUrl from "@/baseUrl/baseUrl";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { Skeleton } from "@/components/ui/skeleton";


const Product = ({ params }: { params: { id: string } }) => {
  const fetcher = (...args: any) => fetch(...args).then((res) => res.json());

  const { id } = params;

  const {
    data: product,
    error,
    isLoading,
  } = useSWR(`${baseUrl}/api/products/${id}`, fetcher);


  const session = useSession();
  const userId = session?.data?.user?.email;
  const isAuthenticated = session?.status === "authenticated";
  const router = useRouter();

  const addToCart = async (product_id: string, user_id: string) => {
    if (!isAuthenticated) {
      router.push("/login?unauthenticated=true");
      return 0;
    }
    // const product = await getProduct(id);
    // const prodId = product;
    try {
      const res = await fetch(`${baseUrl}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          product_id,
        }),
      });

      const data = await res.json();
      // alert(data.message);
      toast.success(data.message, {
        duration: 4000,
        style: { marginTop: "3rem" },
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  // console.log(id)

  // const product = await getProduct(id);

  if (error) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        {error.message}
      </div>
    );
  }
  if (isLoading) {
    return (
      <main className="mx-auto mt-16 flex w-10/12 flex-col gap-10 min-[400px]:w-9/12 sm:flex-row min-[810px]:gap-20 lg:mt-20">
        <Skeleton className="relative h-[300px] w-full sm:w-[600px]" />
        <section className="space-y-10">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[350px]" />
          </div>
          <div className="space-y-5">
            <Skeleton className="h-8 w-[80px]" />
            <div className="flex flex-col gap-6 min-[810px]:flex-row">
              <Skeleton className="h-8 w-full sm:w-[80px]" />
              <Skeleton className="h-8 w-full sm:w-[80px]" />
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <>
      <Toaster />
      <main className="mx-auto mt-16 flex w-10/12 flex-col gap-10 min-[400px]:w-9/12 sm:flex-row min-[810px]:gap-20 lg:mt-20">
        <section className="relative flex h-[300px] w-full items-center justify-center border-[6px] border-neutral-100 sm:w-[600px] ">
          <Image
            src={`/products/${product?.image}`}
            alt={product?.name}
            fill={true}
            style={{ objectFit: "cover" }}
          />
        </section>
        <section className="space-y-10">
          <div className="space-y-2">
            <h1 className="text-xl font-[500]">{product?.name}</h1>
            <p className="text-xs">{product?.description}</p>
          </div>
          <div className="space-y-5">
            <h2 className="font-[600] text-brand-accent">{`$${product?.price}`}</h2>
            <hr className="relative bottom-3 w-3/12 border border-main-text" />
            <div className="flex flex-col gap-6 min-[810px]:flex-row">
              <button className="btn-sm btn flex h-12 items-center justify-center rounded-none bg-brand-accent px-4 py-2 text-xs font-[600] uppercase text-white">
                Buy Now
              </button>
              <button
                className="btn-sm btn flex h-12 items-center justify-center rounded-none border border-brand-accent bg-white px-4 py-2 text-xs font-[600] uppercase text-main-text"
                onClick={() => addToCart(id, userId as string)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Product;
