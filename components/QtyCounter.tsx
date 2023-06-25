import { Minus, Plus } from 'lucide-react'
import React from 'react'

type Props = {}

const QtyCounter = (props: Props) => {
  return (
    <div className="flex border border-neutral-200 rounded-md items-center w-20 justify-between p-1">
        <span className="cursor-pointer"> <Minus width={14} height={14} /> </span><input type="text" className="text-xs w-6 text-center" value={1} /><span className="cursor-pointer"> <Plus width={14} height={14} /></span>
    </div>
  )
}

export default QtyCounter