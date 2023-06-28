"use client";
import baseUrl from "@/baseUrl/baseUrl";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ProductType } from "@/types/ProductType";

const Product = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const session = useSession();
  const userId = session?.data?.user?.email;
  const isAuthenticated = session?.status === "authenticated";
  const router = useRouter();

  const getProduct = async (id: string): Promise<ProductType> => {
    try {
      const res = await fetch(`${baseUrl}/api/products/${id}`);
      if (!res.ok) {
        console.log("Couldn't fetch product resource");
      }
      const data = await res.json();
      return data;
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  };

  const addToCart = async (product_id: string, user_id: string) => {
    if (!isAuthenticated) {
      router.push("/login");
      return 0;
    }
    const product = await getProduct(id);
    const prodId = product;
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
      alert(data.message);
    } catch (error: any) {
      console.log(error);
    }
  };

  // console.log(id)

  const product = await getProduct(id);

  return (
    <main className="mx-auto mt-16 flex w-10/12 flex-col gap-10 min-[400px]:w-9/12 sm:flex-row min-[810px]:gap-20 lg:mt-20">
      <section className="relative flex h-[300px] w-full items-center justify-center border-[6px] border-neutral-100 sm:w-[600px] ">
        <Image
          src={`/products/${product.image}`}
          alt={product.name}
          fill={true}
          style={{ objectFit: "cover" }}
        />
      </section>
      <section className="space-y-10">
        <div className="space-y-2">
          <h1 className="text-xl font-[500]">{product.name}</h1>
          <p className="text-xs">{product.description}</p>
        </div>
        <div className="space-y-5">
          <h2 className="font-[600] text-brand-accent">{`$${product.price}`}</h2>
          <hr className="relative bottom-3 w-3/12 border border-main-text" />
          <div className="flex flex-col gap-6 min-[810px]:flex-row">
            <button className="btn-sm btn rounded-none bg-brand-accent px-4 py-2 text-xs font-[600] uppercase text-white">
              Buy Now
            </button>
            <button
              className="btn-sm btn rounded-none border border-brand-accent bg-white px-4 py-2 text-xs font-[600] uppercase text-main-text"
              onClick={() => addToCart(id, userId as string)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Product;
