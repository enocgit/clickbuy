import Image from "next/image";
import style from "./home.module.css";
import Link from "next/link";
import Button from "@/components/Button";
import baseUrl from "@/baseUrl/baseUrl";

type ProductType = {
  _id: string;
  name: string;
  image: string;
  description?: string;
  price: number;
  quantity: number;
  featured?: boolean;
  extras?: string;
}[];

const getProducts = async (): Promise<ProductType> => {
  try {
    const res = await fetch(`${baseUrl}/api/products`);
    if (!res.ok) {
      console.log("Couldn't fetch data");
    }
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.log(error);
  }
};

export default async function Home() {
  const products = await getProducts();
  // console.log(products)
  return (
    <main className={`${style.container}`}>
      <div className="w-12/12 container mx-auto border border-transparent sm:w-10/12">
        {/* HERO */}
        <section
          id="hero"
          className="mt-16 overflow-x-hidden md:mt-32 xl:mt-40"
        >
          <div className="flex flex-col gap-8">
            <h1
              className="min-[306px]-text-3xl text-2xl font-[900] leading-tight text-main-text dark:text-white min-[366px]:text-4xl md:w-8/12 xl:w-7/12 xl:text-6xl"
              id="tagline"
            >
              Where Shopping Perfection Begins.
            </h1>
            <Link href="/products">
              <Button text="Shop Now" className="px-8" />
            </Link>
          </div>
          <Image
            src="/hero-img-4.png"
            alt="Hero image"
            width={700}
            height={700}
            className="absolute right-20 top-[18rem] h-[200px] w-[200px] max-[1238px]:right-10  min-[502px]:right-[2rem] min-[502px]:top-80 min-[506px]:top-[14rem] min-[506px]:h-[400px] min-[506px]:w-[400px] lg:right-80 min-[1234px]:right-10 min-[1234px]:top-0 min-[1234px]:h-[700px]  min-[1234px]:w-[700px] min-[1235px]:right-[0rem] min-[1440px]:right-40 min-[1440px]:top-20"
          />
        </section>

        {/* FEATURED PRODUCTS */}
        <section
          id="featured-products"
          className="mt-52 space-y-14 min-[506px]:mt-96 min-[1340px]:mt-72"
        >
          <h1 className="text-xl font-[700] text-main-text dark:text-white min-[366px]:text-3xl">
            Featured Products
          </h1>
          <div className="grid justify-center gap-12 min-[550px]:grid-cols-2 min-[940px]:grid-cols-3 min-[1640px]:grid-cols-4">
            {products.map(
              (product) =>
                product.featured && (
                  <Link key={product._id} href={`/products/${product._id}`}>
                    <div className="flex flex-col items-center gap-4">
                      <div className="relative h-52 w-52 border-[6px] border-neutral-100 xl:h-72 xl:w-72">
                        <div className="h-full w-full">
                          <Image
                            src={`/products/${product.image}`}
                            fill={true}
                            style={{ objectFit: "cover" }}
                            alt={product.name}
                          />
                          <span className="absolute right-[-3rem] top-[-3rem] flex h-[80px] w-[80px] scale-50 items-center justify-center rounded-full border border-dashed border-main-text bg-brand-secondary p-8 text-xl font-bold min-[280px]:scale-75 min-[366px]:scale-90 lg:h-[120px] lg:w-[120px]">
                            {`$${product.price}`}
                          </span>
                        </div>
                      </div>
                    </div>
                    <h1 className="text-center text-lg lg:text-xl">
                      {product.name}
                    </h1>
                  </Link>
                )
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
