import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { headers, cookies } from "next/headers";
import dbConnect from "@/db/connectDb";
import MadeToOrder from "@/models/madeToOrder";
import MadeToOrderSubmission from "@/models/madeToOrderSubmission";
import User from "@/models/user";


export async function GET(req, { params }) {
  await dbConnect();

  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const dress = await MadeToOrder.findById(id);
    if (!dress) {
      return NextResponse.json({ message: "MadeToOrder item not found" }, { status: 404 });
    }
    return NextResponse.json(dress, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching MadeToOrder item" }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  await dbConnect();
  console.log("Before session fetch");

  // ✅ Pass headers & cookies to support session auth
  const session = await getServerSession(authOptions);

  console.log("SESSION:", session); // ✅ Now should print the session


  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { measurement, changes } = await req.json();
  const { id: dressId } = params;

  if (!dressId || !measurement) {
    return NextResponse.json({ message: "Dress ID and measurements are required" }, { status: 400 });
  }

  try {
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const submission = await MadeToOrderSubmission.create({
      referenceId: dressId,
      userId: user._id,
      userInfo: {
        name: session.user.name,
        email: session.user.email,
      },
      measurement,
      changes,
    });

    return NextResponse.json({ message: "Submission successful", data: submission }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error submitting data", error: error.message }, { status: 500 });
  }
}