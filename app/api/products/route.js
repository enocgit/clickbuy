import { connectDB } from "@/lib/utils"
import Product from "@/models/ProductModel"
import { NextResponse } from "next/server"

export const GET = async (request) => {
    try {
        await connectDB()
        const products = await Product.find()
        return new NextResponse(JSON.stringify(products), { status: 200})
    } catch (error) {
        throw new Error(error)
    }
}