import { NextResponse } from "next/server";
import { connectDB } from "@/lib/utils";
import Category from "@/models/CategoryModel";

export const GET = async (request: Request) => {
  try {
    await connectDB();
    const categories = await Category.find();
    if (categories.length == 0) {
      return NextResponse.json({message: "No category found"}, { status: 400 })
    }
    // return new NextResponse(JSON.stringify(categories), { status: 200 });
    return NextResponse.json(categories, { status: 200 })
  } catch (error: any) {
    throw new Error(error);
  }
};
