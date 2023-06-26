import { NextResponse } from "next/server";
import { connectDB } from "@/lib/utils";
import Product from "@/models/ProductModel";

export const GET = async (request: Request, { params }: { params: { id: string }}) => {
  const { id } = params;
  try {
    await connectDB();
    const products = await Product.find({ category_id: id });
    if (products.length <= 0) {
      // throw new Error(`Category with the id: ${id} doesn't exist`)
      return NextResponse.json({error: `Category with the id: ${id} doesn't exist`}, {status: 500})
    }
    // return new NextResponse(JSON.stringify(products), { status: 200 });
    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    throw new Error(error);
  }
};
