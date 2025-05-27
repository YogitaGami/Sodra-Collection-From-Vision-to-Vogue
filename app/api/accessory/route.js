import { NextResponse } from "next/server";
import connectDB from "@/db/connectDb";
import Accessory from "@/models/accessory"; 

export async function GET() {
  await connectDB();
  try {
    const accessories = await Accessory.find(); 
    return NextResponse.json(accessories, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching accessories" }, { status: 500 });
  }
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const accessory = await Accessory.create(body);
  return NextResponse.json(accessory);
}