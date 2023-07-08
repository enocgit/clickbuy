import { Minus, Plus } from "lucide-react";
import { useState } from "react";

type Props = {
  quantity: number;
  handleIncreaseQty: () => void;
  handleDecreaseQty: () => void;
  handleChangeQty: () => void
};

const QtyCounter = ({ quantity, handleIncreaseQty, handleDecreaseQty, handleChangeQty  }: Props) => {
  return (
    <div className="flex border border-neutral-200 rounded-md items-center w-20 justify-between p-1">
      <span className="cursor-pointer">
        {" "}
        <Minus width={14} height={14} onClick={handleDecreaseQty}/>{" "}
      </span>
      <input type="text" className="text-xs w-6 text-center dark:bg-transparent dark:text-white" onChange={handleChangeQty} value={quantity as number} />
      <span className="cursor-pointer">
        {" "}
        <Plus width={14} height={14} onClick={handleIncreaseQty} />
      </span>
    </div>
  );
};

export default QtyCounter;
