// // @ts-nocheck
// "use client";
// import Button from "@/components/Button";
// import CartItemCard from "@/components/CartItemCard";
// import useSWR from "swr";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
// import QtyCounter from "@/components/QtyCounter";
// import { Minus, Plus, Trash, Trash2 } from "lucide-react";
// import Image from "next/image";
// import baseUrl from "@/baseUrl/baseUrl";
// import { useEffect } from "react";
// import { CartProductsType } from "@/types/ProductType";

// const Cart = () => {
//   const session = useSession();
//   const userID = session?.data?.user?.email;
//   const router = useRouter();

//   useEffect(() => {
//     session?.status === "unauthenticated" && router.push("/login");
//   }, [router, session]);

//   const fetcher = (...args: any) => fetch(...args).then((res) => res.json());

//   const { data, error, isLoading } = useSWR(
//     `${baseUrl}/api/cart?userID=${userID}`,
//     fetcher
//   );

//   if (error) return <div>failed to load</div>;
//   if (isLoading)
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <div>
//           <span className="loading loading-ring loading-lg"></span>
//         </div>
//       </div>
//     );

//   return (
//     <>
//       <div className="mt-16 hidden overflow-x-auto  px-10 sm:block md:px-20 lg:px-52 2xl:px-96">
//         <h1 className="mx-5 mb-10 text-2xl font-[500] xl:mx-6">Cart</h1>
//         {data?.products?.length <= 0 && (
//           <small>You have no item in your cart. Add one now.</small>
//         )}

//         {/* Heading */}
//         <div className="grid grid-cols-4 py-4">
//           <div className="col-span-2 flex items-center gap-3">
//             <div className="tooltip tooltip-left" data-tip="Select all">
//               <input
//                 type="checkbox"
//                 className="checkbox checkbox-sm border-neutral-400 dark:border-neutral-700"
//               />
//             </div>
//             <h3 className="text-[0.6rem] uppercase text-neutral-700 dark:text-neutral-50">
//               Product
//             </h3>
//           </div>
//           <div className="col-span-1 flex justify-center">
//             <h3 className="relative right-4 text-[0.6rem] uppercase text-neutral-700 dark:text-neutral-50">
//               Quantity
//             </h3>
//           </div>
//           <div className="col-span-1 flex justify-end">
//             <h3 className="text-[0.6rem] uppercase text-neutral-700 dark:text-neutral-50">
//               Price
//             </h3>
//           </div>
//         </div>

//         {/*  */}
//         {data?.products?.map(async (product: CartProductsType) => {
//           const res = await fetch(
//             `${baseUrl}/api/products/${product?.product_id}`
//           );
//           const fetchedProduct = await res.json();
//           return (
//             <div
//               key={fetchedProduct?._id}
//               className="grid grid-cols-4 border-t border-neutral-400 py-6"
//             >
//               <div className="col-span-2 flex items-start gap-3">
//                 <input
//                   type="checkbox"
//                   className="checkbox checkbox-sm border-neutral-400 dark:border-neutral-700"
//                   checked={product?.is_selected}
//                 />
//                 <CartItemCard
//                   image={fetchedProduct?.image}
//                   alt={fetchedProduct?.name}
//                 />
//                 <div>
//                   <div className="text-sm font-[500] text-main-text dark:text-white">
//                     {fetchedProduct?.name}
//                   </div>
//                   <div className="text-[0.6rem] opacity-50">
//                     {fetchedProduct?.extras}
//                   </div>
//                 </div>
//               </div>
//               <div className="col-span-1 flex flex-col items-center gap-2">
//                 <QtyCounter quantity={product?.quantity} />
//                 <div className="flex cursor-pointer items-center gap-1 text-xs">
//                   <Trash2 width={14} height={14} />
//                   <p>Remove item</p>
//                 </div>
//               </div>
//               <div className=" col-span-1 flex justify-end">
//                 <h3 className="text-sm">{`$${fetchedProduct?.price}`}</h3>
//               </div>
//             </div>
//           );
//         })}

//         {/*  */}
//         <div className="mt-20 flex flex-col items-end gap-3">
//           <input
//             type="text"
//             className="w-32 border border-main-text px-2 py-1 text-right text-sm font-[600] dark:text-neutral-900"
//             value={`$${data?.total_price?.toFixed(2)}`}
//           />
//           <Button text="Check out" className="btn-sm w-32 text-xs font-[600]" />
//         </div>
//       </div>

//       {/***  Mobile version of Cart ****/}
//       <div className="mt-16 block px-2 min-[302px]:px-10 sm:hidden">
//         <h1 className="mx-5 mb-10 text-2xl font-[500] xl:mx-6">Cart</h1>
//         {data?.products?.length <= 0 && (
//           <small>You have no item in your cart. Add one now.</small>
//         )}

//         <div className="tooltip tooltip-right" data-tip="Select all">
//           <input
//             type="checkbox"
//             className="checkbox checkbox-sm border-neutral-400 dark:border-neutral-700"
//           />
//         </div>

//         {/*  */}
//         {data?.products?.map(async (product: CartProductsType) => {
//           const res = await fetch(
//             `${baseUrl}/api/products/${product?.product_id}`
//           );
//           const fetchedProduct = await res.json();
//           return (
//             <div
//               key={fetchedProduct?._id}
//               className="border-t border-neutral-400 py-6"
//             >
//               <div className="col-span-2 flex items-start gap-3">
//                 <input
//                   type="checkbox"
//                   className="checkbox checkbox-sm border-neutral-400 dark:border-neutral-700"
//                   checked={product?.is_selected}
//                 />
//                 <CartItemCard
//                   image={fetchedProduct?.image}
//                   alt={fetchedProduct?.name}
//                 />
//                 <div className="flex flex-col items-start gap-3">
//                   <section>
//                     <div className="text-sm font-[500] text-main-text dark:text-white">
//                       {fetchedProduct?.name}
//                     </div>
//                     <div className="text-[0.6rem] opacity-50">
//                       {fetchedProduct?.extras}
//                     </div>
//                   </section>
//                   <section>
//                     <div className="col-span-1 flex  flex-col gap-2">
//                       <QtyCounter quantity={product?.quantity} />
//                       <div className="cursor-pointer text-xs">
//                         <Trash2 width={14} height={14} />
//                       </div>
//                     </div>
//                   </section>
//                   <section>
//                     <h3 className="text-sm">{`$${fetchedProduct?.price}`}</h3>
//                   </section>
//                 </div>
//               </div>
//             </div>
//           );
//         })}

//         {/*  */}
//         <div className="mt-10 flex flex-col items-end gap-3">
//           <input
//             type="text"
//             className="w-32 border border-main-text px-2 py-1 text-right text-sm font-[600] dark:text-neutral-900"
//             value={`$${data?.total_price?.toFixed(2)}`}
//           />
//           <Button text="Check out" className="btn-sm w-32 text-xs font-[600]" />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Cart;

export default async function page() {

  return (
    
    <h1>Hi</h1>
  );
}