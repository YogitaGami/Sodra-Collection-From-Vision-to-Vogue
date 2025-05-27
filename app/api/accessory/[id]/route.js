import { NextResponse } from "next/server";
import dbConnect from "@/db/connectDb";
import Accessory from "@/models/accessory"; 

export async function GET(req, { params }) {
  await dbConnect();

  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }
  
  try {
    const accessory = await Accessory.findById(params.id);
    if (!accessory) {
      return NextResponse.json({ message: "Accessory not found" }, { status: 404 });
    }
    return NextResponse.json(accessory, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching accessory" }, { status: 500 });
  }
}



export async function PUT(req, { params }) {
  await dbConnect();
  const data = await req.json();
  const updated = await Accessory.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  await dbConnect();
  await Accessory.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}