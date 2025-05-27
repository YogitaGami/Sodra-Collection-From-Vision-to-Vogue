import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import connectDB from "@/db/connectDb";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { orderId } = await req.json();

  const updated = await Order.findOneAndUpdate(
    { orderId },
    { status: "delivered", deliveredAt: new Date() },
    { new: true }
  );

  return NextResponse.json({ success: true, order: updated });
}
