import Product from "@/models/ProductModel";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/utils";

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    await connectDB();
    const product = await Product.findById(id);
    if (!product) {
      throw new Error();
      return NextResponse.json({message: `Product with the id ${id} doesn't exist`}, { status: 400 })
    }
    return NextResponse.json(product)
  } catch (error: any) {
    throw new Error(error);
  }
};
