import Image from "next/image";


type ProductType = {
  name: string;
  image: string;
  description: string;
  price: number;
}


const getProduct = async (id: string): Promise<ProductType> => {
  const res = await fetch(`/api/products/${id}`)
  const data = res.json()
  return data
}


const Product = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    // console.log(id)

    const product = await getProduct(id)

    return (
      <main className="mx-auto mt-16 lg:mt-20 flex flex-col sm:flex-row w-10/12 min-[400px]:w-9/12 gap-10 min-[810px]:gap-20">
        <section className="relative flex h-[300px] w-full sm:w-[600px] items-center justify-center border-[6px] border-neutral-100 ">
          <Image src={`/products/${product.image}`} alt={product.name} fill={true} style={{objectFit: "cover"}} />
        </section>
        <section className="space-y-10">
          <div className="space-y-2">
            <h1 className="text-xl font-[500]">{product.name}</h1>
            <p className="text-xs">
              {product.description}
            </p>
          </div>
          <div className="space-y-5">
            <h2 className="font-[600] text-brand-accent">{`$${product.price}`}</h2>
            <hr className="relative bottom-3 w-3/12 border border-main-text" />
            <div className="flex flex-col min-[810px]:flex-row gap-6">
              <button className="btn btn-sm text-xs rounded-none bg-brand-accent px-4 py-2 font-[600] uppercase text-white">
                Buy Now
              </button>
              <button className="btn btn-sm text-xs rounded-none border border-brand-accent bg-white px-4 py-2 font-[600] uppercase text-main-text">
                Add to Cart
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  };


  export default Product