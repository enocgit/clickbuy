import { NextResponse } from "next/server";
import { connectDB } from "@/lib/utils";
import Category from "@/models/CategoryModel";

export const GET = async (request: Request) => {
  try {
    await connectDB();
    const categories = await Category.find();
    // return new NextResponse(JSON.stringify(categories), { status: 200 });
    return NextResponse.json(categories, { status: 200 })
  } catch (error: any) {
    throw new Error(error);
  }
};
