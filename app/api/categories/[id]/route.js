import { NextResponse } from "next/server"
import { connectDB } from "@/lib/utils"
import Product from "@/models/ProductModel"


export const GET = async (request, { params }) => {
    const { id } = params
    try {
        await connectDB()
        const products = await Product.find({category_id: id})
        return new NextResponse(JSON.stringify(products), { status: 200 })
    } catch (error) {
        throw new Error(error)
    }
}