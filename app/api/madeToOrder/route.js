import { NextResponse } from "next/server";
import connectDB from "@/db/connectDb";
import MadeToOrder from "@/models/madeToOrder"; 

export async function GET() {
  await connectDB();
  try {
    const madeToOrders = await MadeToOrder.find(); 
    return NextResponse.json(madeToOrders, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching madeToOrder" }, { status: 500 });
  }
}