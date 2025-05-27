import dbConnect from "@/db/connectDb";
import Order from "@/models/order";
import { NextResponse } from "next/server"; 

export async function GET(req, { params }) {
  await dbConnect();

  const { orderId } = params;
  if (!orderId) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }
  
  try {
    const order = await Order.findOne({orderId}).populate("address");
    console.log(JSON.stringify(order, null, 2));
    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching order" }, { status: 500 });
  }
}
