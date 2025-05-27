// pages/api/dashboard-stats.js
import connectDB from "@/db/connectDb";
import User from "@/models/user";
import Dress from "@/models/dresses";
import Accessory from "@/models/accessory";
import ArtPiece from "@/models/artPiece";
import MadeToOrder from "@/models/madeToOrder";
import MadeToOrderSubmission from "@/models/madeToOrderSubmission";
import Order from "@/models/order";
import ContactMessage from "@/models/contactMessages";
import { NextResponse } from "next/server";

export async function GET(){
  await connectDB();

  try {
    const [userCount, dressCount, accessoryCount, artCount, madeToOrderCount, madeToOrderSubmissionCount, orderCount, ContactMessageCount] = await Promise.all([
      User.countDocuments(),
      Dress.countDocuments(),
      Accessory.countDocuments(),
      ArtPiece.countDocuments(),
      MadeToOrder.countDocuments(),
      MadeToOrderSubmission.countDocuments(),
      Order.countDocuments(),
      ContactMessage.countDocuments(),
    ]);

    return NextResponse.json({
      users: userCount,
      dresses: dressCount,
      accessories: accessoryCount,
      artPieces: artCount,
      madeToOrders: madeToOrderCount,
      madeToOrderSubmission: madeToOrderSubmissionCount,
      orders: orderCount,
      contactMessages: ContactMessageCount,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
