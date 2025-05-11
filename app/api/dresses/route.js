import { NextResponse } from "next/server";
import connectDB from "@/db/connectDb";
import Dress from "@/models/dresses"; // Make sure this model is correct

export async function GET() {
  await connectDB();
  try {
    const dresses = await Dress.find(); // Fetch all dresses
    return NextResponse.json(dresses, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching dresses" }, { status: 500 });
  }
}
