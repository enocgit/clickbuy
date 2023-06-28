import ProductCard from "@/components/ProductCard";
import baseUrl from "@/baseUrl/baseUrl";

type Props = {};

type ProductType = {
  _id: string;
  name: string;
  image: string;
  price: string;
}[];

const getProduct = async (): Promise<ProductType> => {
  try {
    const res = await fetch(`${baseUrl}/api/products`);
    if (!res.ok) {
      console.log("Couldn't fetch data");
    }
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.log("error");
  }
};

const Products = async (props: Props) => {
  const products = await getProduct();
  // console.log(products)

  return (
    <main className="overflow-x-hidden">
      <div className="mt-24 bg-brand-secondary px-5 py-2 pb-10 lg:px-28">
        <h1 className="relative bottom-14 mx-5 text-left text-2xl font-[500] xl:mx-20">
          Products
        </h1>
        <section className="grid gap-20 gap-x-10 min-[480px]:grid-cols-2 min-[720px]:grid-cols-3 xl:gap-x-5 2xl:grid-cols-4 min-[2080px]:grid-cols-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              href={product._id}
              name={product.name}
              alt={product.image}
              image={product.image}
              price={product.price}
            />
          ))}
        </section>
      </div>
      <div className="mt-20 flex items-center justify-center">
        <button className="btn rounded-none border border-brand-secondary bg-white px-8 font-[600] uppercase text-main-text">
          View more
        </button>
      </div>
    </main>
  );
};

export default Products;
