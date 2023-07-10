import Image from "next/image";
import Link from "next/link";

type Props = {
  href: string;
  alt: string;
  image: string;
  name: string;
  query: string;
};

const CategoryCard = ({ href, image, name, alt, query }: Props) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <Link href={`/categories/${href}?category=${query}`}>
        <div className="relative h-52 w-52 border-[6px] border-neutral-100 bg-white lg:h-60 lg:w-60 flex items-center justify-center">
          <Image
            src={`/categories/${image}`}
            fill={true}
            alt={alt}
            style={{ objectFit: "cover" }}
          />
        </div>
      </Link>
      <h1 className="text-lg lg:text-xl">{name}</h1>
    </div>
  );
};

export default CategoryCard;
