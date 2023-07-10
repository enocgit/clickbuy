// @ts-nocheck
"use client"
import ProductCard from "@/components/ProductCard";
import CategoryModel from "@/models/CategoryModel";
import Link from "next/link";
import mongoose from "mongoose";
import baseUrl from "@/baseUrl/baseUrl";
import useSWR from "swr";
import { Skeleton } from "@/components/ui/skeleton";
import { useContext, useEffect } from "react";
import { CategoryContext } from "@/contexts/CategoryProvider";
import { useSearchParams } from "next/navigation";
// import { ProductType } from "@/types/types";
// import { identifierToKeywordKind } from "typescript";

type Props = {};

const fetcher = (...args: any) => fetch(...args).then((res) => res.json());




const Category = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const searchParams = useSearchParams()
  const categoryParam = searchParams.getAll("category");
  const category = categoryParam ? decodeURIComponent(categoryParam) : null;

  const { addCategory, categoryList } = useContext(CategoryContext)
  

  useEffect(() => {
    addCategory(category)
    console.log(categoryList)
  }, [categoryList, category, addCategory])

  const { data: categoryProducts, error, isLoading } = useSWR(
    `${baseUrl}/api/categories/${id}`,
    fetcher
  );
  // console.log(id)
  // const categoryProducts = await getCategoryProducts(id);
  // const firstCategoryId = categoryProducts[0]?.category_id;
  // const category = await CategoryModel.findOne({ _id: firstCategoryId });

  const sampleArr = [1, 2, 3,]

 


  if (error) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        {error.message}
      </div>
    );
  }
  if (isLoading) {
    return (
      <main className="overflow-x-hidden">
      <div className="mt-24 bg-[#d4b464] px-5 py-2 pb-10 xl:px-28">
        <div className="breadcrumbs relative bottom-14 mx-5 text-left text-sm font-[500] xl:mx-20">
          <ul>
            <li>
              <div>Categories</div>
            </li>
            <li>
              <Skeleton className="h-4 w-[80px]" />
            </li>
          </ul>
        </div>
        <section className="grid gap-20 gap-x-10 min-[480px]:grid-cols-2 min-[720px]:grid-cols-3 xl:gap-x-5 2xl:grid-cols-4 min-[2080px]:grid-cols-6">
      {sampleArr.map(num => (
        <div key={num} className="flex flex-col items-center gap-4">
            <Skeleton className="h-52 w-52 lg:h-60 lg:w-60 bg-neutral-300 bg-opacity-50" />
            <Skeleton className="h-4 w-[200px] bg-neutral-300 bg-opacity-50" />
            <Skeleton className="h-4 w-[90px] bg-neutral-300 bg-opacity-50" />
            <Skeleton className="h-8 w-[120px] bg-neutral-300 bg-opacity-50" />
        </div>
      ))}
    </section>
      </div>
     
    </main>
  )
  }


  return (
    <main className="overflow-x-hidden">
      <div className="mt-24 bg-brand-secondary px-5 py-2 pb-10 xl:px-28">
        <div className="breadcrumbs relative bottom-14 mx-5 text-left text-sm font-[500] xl:mx-20">
          <ul>
            <li>
              <Link href="/categories">Categories</Link>
            </li>
            <li>
              <div>{category}</div>
            </li>
          </ul>
        </div>
        <section className="grid gap-20 gap-x-10 min-[480px]:grid-cols-2 min-[720px]:grid-cols-3 xl:gap-x-5 2xl:grid-cols-4 min-[2080px]:grid-cols-6">
          {categoryProducts?.map((product) => (
            <ProductCard
              key={product?._id}
              name={product?.name}
              href={product?._id}
              alt={product?.name}
              image={product?.image}
              price={product?.price}
            />
          ))}
        </section>
      </div>
      <div className="mt-20 flex items-center justify-center">
        <button className="text-main_text btn rounded-none border border-[#d58566] bg-white px-8 font-[600] uppercase">
          View more
        </button>
      </div>
    </main>
  );
};

export default Category;
