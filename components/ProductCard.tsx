import Image from "next/image";
import Link from "next/link";

type Props = {
  href: string;
  name: string;
  alt: string;
  price: number;
  image: string;
};

const ProductCard = ({ href, name, price, image, alt }: Props) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <Link href={`/products/${href}`}>
        <div className="relative flex h-52 w-52 items-center justify-center border-[6px] border-neutral-100 bg-white lg:h-60 lg:w-60">
          <Image
            src={`/products/${image}`}
            fill={true}
            style={{ objectFit: "cover" }}
            alt={alt}
          />
        </div>
      </Link>
      <h1 className="text-lg lg:text-xl">{name}</h1>
      <h2 className="text-xl lg:text-2xl">{`$${price}`}</h2>
      <Link href={`/products/${href}`}>
        <button className="text-main_text btn w-32 scale-75 rounded-none border-none bg-white uppercase hover:text-white lg:scale-100">
          Buy now
        </button>
      </Link>
    </div>
  );
};

export default ProductCard;
