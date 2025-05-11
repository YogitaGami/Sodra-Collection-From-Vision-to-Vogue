import { NextResponse } from "next/server";
import connectDB from "@/db/connectDb";
import Address from "@/models/address";

// Handle POST request
export async function POST(req) {
  try {
    await connectDB(); 

    const body = await req.json(); // Parse JSON request body

    const { name, email, mobileNo, pinCode, addressLine1, addressLine2, city, state, addressType } = body;

    // Check if address exists for the user
    const existingAddress = await Address.findOne({ email });

    if (existingAddress) {
      // Update the existing address
      existingAddress.name = name;
      existingAddress.mobileNo = mobileNo;
      existingAddress.pinCode = pinCode;
      existingAddress.addressLine1 = addressLine1;
      existingAddress.addressLine2 = addressLine2;
      existingAddress.city = city;
      existingAddress.state = state;
      existingAddress.addressType = addressType;

      await existingAddress.save();

      return NextResponse.json({ message: "Address updated successfully!", address: existingAddress }, { status: 200 });
    } else {
      // Create a new address
      const newAddress = new Address({
        name,
        email,
        mobileNo,
        pinCode,
        addressLine1,
        addressLine2,
        city,
        state,
        addressType
      });

      await newAddress.save();

      return NextResponse.json({ message: "Address saved successfully!", address: newAddress }, { status: 201 });
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to save or update address", details: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const address = await Address.findOne({ email });
    if (!address) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 });
    }
    return NextResponse.json(address, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}