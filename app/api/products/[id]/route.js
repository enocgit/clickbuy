import Product from "@/models/ProductModel"
import { NextResponse } from "next/server"
import { connectDB } from "@/lib/utils"

export const GET = async (request, { params }) => {
    const { id } = params
    console.log("ID:", id)

    try {
        await connectDB()
        const product = await Product.findById(id)
        return new NextResponse(JSON.stringify(product), { status: 200 })
    } catch (error) {
        throw new Error(error);
    }
}