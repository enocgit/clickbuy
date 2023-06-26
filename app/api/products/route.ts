import { connectDB } from "@/lib/utils";
import Product from "@/models/ProductModel";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    await connectDB();
    const products = await Product.find();
    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error: any) {
    throw new Error(error);
  }
};
