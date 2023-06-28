import { connectDB } from "@/lib/utils";
import Product from "@/models/ProductModel";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    await connectDB();
    const products = await Product.find();
    if (!products) {
      return NextResponse.json({message: "No product found"}, { status: 400 })
    }
    // return new NextResponse(JSON.stringify(products), { status: 200 });
    return NextResponse.json(products)
  } catch (error: any) {
    throw new Error(error);
  }
};
