import { NextResponse } from "next/server";
import dbConnect from "@/db/connectDb";
import ArtPiece from "@/models/artPiece"; 

export async function GET(req, { params }) {
  await dbConnect();

  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }
  
  try {
    const artPiece = await ArtPiece.findById(params.id);
    if (!artPiece) {
      return NextResponse.json({ message: "ArtPiece not found" }, { status: 404 });
    }
    return NextResponse.json(artPiece, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching artPiece" }, { status: 500 });
  }
}
