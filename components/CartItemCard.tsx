import Image from 'next/image'
import React from 'react'

type Props = {}

const CartItemCard = (props: Props) => {
  return (
    <div className="relative min-h-[112px] min-w-[112px] flex items-center justify-center rounded-lg border-[2px] border-neutral-100 bg-white">
      <Image src="/products/headphones.jpg" fill={true} alt="product" style={{objectFit: "cover"}} />
    </div>
  )
}

export default CartItemCard

