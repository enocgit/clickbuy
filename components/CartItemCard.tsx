import Image from 'next/image'
import React from 'react'

type Props = {}

const CartItemCard = (props: Props) => {
  return (
    <div className="min-h-[112px] min-w-[112px] flex items-center justify-center rounded-lg border-[2px] border-neutral-100 bg-white">
      <Image src="/dummy.png" width={100} height={100} alt="product" />
    </div>
  )
}

export default CartItemCard

