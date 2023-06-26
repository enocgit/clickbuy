import CategoryCard from "@/components/CategoryCard";
import React from "react";
import baseUrl from "../baseUrl/baseUrl";

type Props = {};

type CategoriesType = {
  _id: string;
  name: string;
  image: string;
  description?: string;
}[];

const getCategories = async (): Promise<CategoriesType> => {
  const res = await fetch(`${baseUrl}/api/categories`);
  const data = res.json();
  return data;
};

const Categories = async (props: Props) => {
  const categories = await getCategories();
  return (
    <main className="overflow-x-hidden">
      <div className="mt-10 px-5 py-20 lg:px-28">
        <h1 className="relative bottom-10 mx-5 text-left text-2xl font-[500] xl:mx-20">
          Categories
        </h1>
        <section className="grid gap-20 gap-x-10 min-[480px]:grid-cols-2 min-[720px]:grid-cols-3 xl:gap-x-5 2xl:grid-cols-4 min-[2080px]:grid-cols-6">
          {categories.map((category) => (
            <CategoryCard
              key={category._id}
              href={category._id}
              alt={category.image}
              name={category.name}
              image={category.image}
            />
          ))}
        </section>
      </div>
    </main>
  );
};

export default Categories;
