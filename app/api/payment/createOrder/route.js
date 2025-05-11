import Razorpay from "razorpay";
import connectDB from "@/db/connectDb"; 
import Order from "@/models/order";
import { NextResponse } from "next/server"; 

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { amount, username, dressDetails } = body;

    if (!amount || !username || !dressDetails) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!process.env.RAZORPAY_KEY_SECRET || !process.env.RAZORPAY_KEY_ID) {
      return NextResponse.json({ error: "Razorpay API keys not found" }, { status: 500 });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: Math.round(amount * 100), // should be in paise
      currency: "INR",
      receipt: `order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    if (!order || !order.id) {
      return NextResponse.json({ error: "Failed to create Razorpay order" }, { status: 500 });
    }

    const newOrder = new Order({
      orderId: order.id,
      username,
      amount,
      dressDetails,
      status: "pending",
    });
    await newOrder.save();

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Razorpay API Error:", error);
    return NextResponse.json({ error: error.message || "Server Error" }, { status: 500 });
  }
}
