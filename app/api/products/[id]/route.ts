import Product from "@/models/ProductModel";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/utils";

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    await connectDB();
    const product = await Product.findById(id);
    if (!product) {
      // return NextResponse.json({error: `Product with the id: ${id} doesn't exist`}, { status: 500})
      throw new Error(`Product with the id ${id} doesn't exist`);
    }
    return NextResponse.json(product)
  } catch (error: any) {
    throw new Error(error);
  }
};
