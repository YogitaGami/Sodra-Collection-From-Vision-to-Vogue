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
