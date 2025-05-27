import connectDB from "@/db/connectDb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectDB();
  const user = await User.findById(params.id);
  return NextResponse.json(user);
}

export async function PUT(req, { params }) {
  await connectDB();
  const data = await req.json();
  const updated = await User.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  await connectDB();
  await User.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
