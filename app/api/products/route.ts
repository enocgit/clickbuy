import { connectDB } from "@/lib/utils";
import Product from "@/models/ProductModel";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    await connectDB();
    const products = await Product.find();

    if (products.length === 0) {
      return NextResponse.json({ message: "No products found" }, { status: 400 });
    }

    return NextResponse.json(products);
  } catch (error: any) {
    console.error(error);
    throw new Error(error)
    // return NextResponse.error("An error occured while fetching products")
  }
};
