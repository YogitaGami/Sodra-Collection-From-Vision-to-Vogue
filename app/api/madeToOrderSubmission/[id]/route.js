import { NextResponse } from "next/server";
import dbConnect from "@/db/connectDb";
import MadeToOrderSubmission from "@/models/madeToOrderSubmission"; 

export async function GET(req, { params }) {
  await dbConnect();

  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }
  
  try {
    const madetoOrderSubmission = await MadeToOrderSubmission.findById(params.id);
    if (!madetoOrderSubmission) {
      return NextResponse.json({ message: "MadetoOrderSubmission not found" }, { status: 404 });
    }
    return NextResponse.json(madetoOrderSubmission, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching customDress" }, { status: 500 });
  }
}



export async function PUT(req, { params }) {
  await dbConnect();
  const data = await req.json();
  const updated = await MadeToOrderSubmission.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  await dbConnect();
  await MadeToOrderSubmission.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}