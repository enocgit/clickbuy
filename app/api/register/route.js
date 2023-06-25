import { connectDB } from '@/lib/utils';
import User from "@/models/UserModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
  // return new NextResponse(JSON.stringify({ 'Waguan': 'Not working'}, {status: 200}))
  const { name, email, password } = await request.json();

  try {
    await connectDB();
    const userExists = await User.findOne({ email });

    // check if a user exists
    if (userExists) {
      return new NextResponse("Email already taken", { status: 400 });
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedpassword,
    });

    await newUser.save();
    return new NextResponse(JSON.stringify(newUser), { status: 201 });
  } catch (err) {
    return new NextResponse(err, { status: 500 });
  }
};
