import { connectDB } from "@/lib/utils";
import User from "@/models/UserModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request: Request) => {
  // return new NextResponse(JSON.stringify({ 'Waguan': 'Not working'}, {status: 200}))
  const { name, email, password } = await request.json();

  try {
    await connectDB();
    const userExists = await User.findOne({ email });

    // check if a user exists
    if (userExists) {
      // return new NextResponse("Email already taken", { status: 400 });
      return NextResponse.json({"message": "Email already taken."}, {status: 400});
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedpassword,
    });

    await newUser.save();
    return NextResponse.json({"message": "Your account has been successfully created"}, { status: 201 })
    // return new NextResponse(JSON.stringify(newUser), { status: 201 });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    // return new NextResponse(error, { status: 500 });
    throw new Error(error)
  }
};
