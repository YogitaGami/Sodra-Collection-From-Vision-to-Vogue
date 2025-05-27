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
    return NextResponse.json(
      { message: "Error fetching dress" },
      { status: 500 }
    );
  }
}

export async function PUT(req, context) {
  await dbConnect();

  const { params } = context;
  const id = params.id;
  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }
  try {
    const data = await req.json();
    if (!data) {
      return NextResponse.json({ message: "Dress not found" }, { status: 404 });
    }
    const updated = await Dress.findByIdAndUpdate(params.id, data, {
      new: true})
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(updated);
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();
  await Dress.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
