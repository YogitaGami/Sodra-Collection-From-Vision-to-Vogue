// app/api/admin/users/route.js
import { NextResponse } from "next/server";
import connectDB from "@/db/connectDb";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(req) {
  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const users = await User.find()
    console.log(users)
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching users" }, { status: 500 });
  }
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const user = await User.create(body);
  return NextResponse.json(user);
}