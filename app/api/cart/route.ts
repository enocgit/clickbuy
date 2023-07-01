import { connectDB } from "@/lib/utils";
import Cart from "@/models/CartModel"
import Product from "@/models/ProductModel";
import { NextResponse } from "next/server";


export const POST = async (req: Request) => {
    const { user_id, product_id } = await req.json()

    try {
        await connectDB()
        // get cart by user ID
        let cart = await Cart.findOne({ user_id })
        // If there is no Cart, create one
        if (!cart) {
            cart = await new Cart({
                products: [],
                user_id,
                total_price: 0
            })
        }

        // add to the products array the product added by the user
        const product = await Product.findById(product_id)
        cart.products.push(
            {
                product_id,
                is_selected: false,
                quantity: 1
            }
        )
        
        // increase the total price
        cart.total_price += product.price

        await cart.save()
        return NextResponse.json({message: "Product added to cart successfully"}, { status: 200 })

    } catch (error: any) {
        throw new Error(error)
    }
}



export const GET = async (req: Request) => {
    const url = new URL(req.url)
    const userID = url.searchParams.get("userID")

    try {
        await connectDB()
        const cart = await Cart.findOne({user_id: userID})
        if (!cart) {
            return NextResponse.json(
                { error: "Cart not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(cart, { status: 200 })
    } catch (error: any) {
        throw new Error(error)
    }
}