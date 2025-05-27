import connectDB from "@/db/connectDb";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();

  try {
    const orders = await Order.find().populate("userId").populate("address").sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
