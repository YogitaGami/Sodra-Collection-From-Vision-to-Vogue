import connectDB from "@/db/connectDb";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  await connectDB();
  await Order.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
