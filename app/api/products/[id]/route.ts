import { connectDB } from "@/lib/utils";
import Product from "@/models/ProductModel";
import { NextResponse } from "next/server";

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    await connectDB();
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { message: `Product with the id ${id} doesn't exist` },
        { status: 400 }
      );
    }

    return NextResponse.json(product);
  } catch (error: any) {
    console.error(error);
    throw new Error(error)
    // return NextResponse.error(error);
  }
};
