import ProductCard from "@/components/ProductCard";
import CategoryModel from "@/models/CategoryModel";
import Link from "next/link";
import mongoose from "mongoose"
// import { identifierToKeywordKind } from "typescript";


type Props = {};

type CategoriesProductsType = {
  _id: string;
  name: string;
  image: string;
  alt: string;
  price: string;
  category_id?: string;
}[]

const getCategoryProducts = async (id: string): Promise<CategoriesProductsType> => {
  const res = await fetch(`http://localhost:3000/api/categories/${id}`)
  const data = res.json()
  return data
}

const Category = async ({ params }: { params: { id: string }}) => {
  const { id } = params
  // console.log(id)
  const categoryProducts = await getCategoryProducts(id)
  const firstCategoryId = await categoryProducts[0]?.category_id
  const category = await CategoryModel.findOne({_id: firstCategoryId})
  console.log(category.name)

  return (
    <main className="overflow-x-hidden">
      <div className="mt-24 bg-brand-secondary px-5 py-2 pb-10 xl:px-28">
        <div className="breadcrumbs relative bottom-14 mx-5 text-left text-sm font-[500] xl:mx-20">
          <ul>
            <li>
              <Link href="/categories">Categories</Link>
            </li>
            <li>
              <div>{category.name}</div>
            </li>
          </ul>
        </div>
        <section className="grid gap-20 gap-x-10 min-[480px]:grid-cols-2 min-[720px]:grid-cols-3 xl:gap-x-5 2xl:grid-cols-4 min-[2080px]:grid-cols-6">
          {categoryProducts.map(product => (
              <ProductCard key={product._id} name={product.name} href={product._id} alt={product.name} image={product.image} price={product.price}  />
          ))}
        </section>
      </div>
      <div className="mt-20 flex items-center justify-center">
        <button className="btn rounded-none border border-[#d58566] bg-white px-8 font-[600] uppercase text-main_text">
          View more
        </button>
      </div>
    </main>
  );
};

export default Category;







