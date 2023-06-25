import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  href: string;
  name: string;
  alt: string;
  price: string;
  image: string
};

const ProductCard = ({href, name, price, image, alt}: Props) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <Link href={`/products/${href}`}>
        <div className="relative h-52 w-52 border-[6px] border-neutral-100 bg-white lg:h-60 lg:w-60 flex items-center justify-center">
          <Image src={`/products/${image}`} fill={true} style={{objectFit: "cover"}} alt={alt} />
        </div>
      </Link>
      <h1 className="text-lg lg:text-xl">{name}</h1>
      <h2 className="text-xl lg:text-2xl">{`$${price}`}</h2>
      <Link href={`/products/${href}`}>
        <button className="btn w-32 rounded-none border-none bg-white uppercase text-main_text hover:text-white scale-75 lg:scale-100">
          Buy now
        </button>
      </Link>
    </div>
  );
};

export default ProductCard;
