import CategoryCard from "@/components/CategoryCard";
import baseUrl from "@/baseUrl/baseUrl";

type Props = {};

type CategoriesType = {
  _id: string;
  name: string;
  image: string;
  description?: string;
}[];

const getCategories = async (): Promise<CategoriesType> => {
  try {
    const res = await fetch(`${baseUrl}/api/categories`);
    if (!res.ok) {
      console.log("Couldn't fetch data");
    }
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
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
