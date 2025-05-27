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


export async function PUT(req, { params }) {
  await dbConnect();
  const data = await req.json();
  const updated = await ArtPiece.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  await dbConnect();
  await ArtPiece.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
