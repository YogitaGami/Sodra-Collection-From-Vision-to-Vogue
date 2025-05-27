import { NextResponse } from "next/server";
import connectDB from "@/db/connectDb";
import ArtPiece from "@/models/artPiece"; 

export async function GET() {
  await connectDB();
  try {
    const artPieces = await ArtPiece.find(); 
    return NextResponse.json(artPieces, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching artPiece" }, { status: 500 });
  }
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const artPiece = await ArtPiece.create(body);
  return NextResponse.json(artPiece);
}