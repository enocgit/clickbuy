import Image from "next/image";

type Props = {
  image: string;
  alt: string;
};

const CartItemCard = ({ image, alt }: Props) => {
  return (
    <div className="relative min-h-[112px] min-w-[112px] flex items-center justify-center rounded-lg border-[2px] border-neutral-100 bg-white">
      <Image
        src={`/products/${image}`}
        fill={true}
        alt={alt}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};

export default CartItemCard;
