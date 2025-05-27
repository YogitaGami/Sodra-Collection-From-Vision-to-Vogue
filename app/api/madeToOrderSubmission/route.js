import { NextResponse } from "next/server";
import connectDB from "@/db/connectDb";
import MadeToOrderSubmission from "@/models/madeToOrderSubmission"; 

export async function GET() {
  await connectDB();
  try {
    const madetoOrderSubmissions = await MadeToOrderSubmission.find(); 
    return NextResponse.json(madetoOrderSubmissions, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching madetoOrderSubmissions" }, { status: 500 });
  }
}
