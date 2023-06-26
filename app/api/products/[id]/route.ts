import Product from "@/models/ProductModel";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/utils";

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  const { id } = params;
  console.log("ID:", id);

  try {
    await connectDB();
    const product = await Product.findById(id);
    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (error: any) {
    throw new Error(error);
  }
};
