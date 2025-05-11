import { NextResponse } from "next/server";
import dbConnect from "@/db/connectDb";
import Dress from "@/models/dresses"; 

export async function GET(req, { params }) {
  await dbConnect();

  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }
  
  try {
    const dress = await Dress.findById(params.id);
    if (!dress) {
      return NextResponse.json({ message: "Dress not found" }, { status: 404 });
    }
    return NextResponse.json(dress, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching dress" }, { status: 500 });
  }
}
