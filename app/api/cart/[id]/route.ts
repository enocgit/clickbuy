// @ts-nocheck
import { connectDB } from "@/lib/utils"
import Cart from "@/models/CartModel"
import Product from "@/models/ProductModel"
import { NextResponse } from "next/server"

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params
    const { searchParams } = new URL(req.url)

    const product_id = searchParams.get("product_id")
    const type = searchParams.get("type")
    console.log(type)

    const { is_selected, quantity } = await req.json()
    // const { quantity } = await req.json()

    // console.log(quantity)

    console.log(is_selected)
    
    try {
        await connectDB()
        const cart = await Cart.findById(id)
        const product: Partial<CartProductType> = cart?.products?.find((product: Partial<ProductType>) => product._id?.toString() === product_id)
   
        // product.is_selected = !product.is_selected
        if (is_selected) {
            product.is_selected = is_selected
        }
        if (quantity) {
            if (type === "increase")
                product.quantity += 1
            else if (type === "decrease")
                product.quantity -= 1
        }

        await cart.save()
        return NextResponse.json({"message": "product updated"}, {"status": 200})
    } catch (error: any) {
        throw new Error(error)
    }
}


export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params
    const { searchParams } = new URL(req.url)
    const product_id = searchParams.get("product_id")

    console.log(product_id)
    try {
        await connectDB()
        const cart = await Cart.findById(id)
        
        
        const product: Partial<CartProductType> = cart?.products?.find((product: Partial<ProductType>) => product._id?.toString() === product_id)
        // const actualProduct = await Product.findOne({_id: product.product_id})
        // console.log(actualProduct)
        
        const index = cart.products.indexOf(product);
        if (index > -1) { // only splice array when item is found
        cart.products.splice(index, 1); // 2nd parameter means remove one item only
        }

        // console.log(cart?.total_price, actualProduct?.price)

        // cart.total_price -= actualProduct?.price
        await cart.save()
        return NextResponse.json({"message": "product updated"}, {"status": 200})
    } catch (error: any) {
        throw new Error(error)
    }
}