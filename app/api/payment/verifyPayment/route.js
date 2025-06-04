import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Order from "@/models/order";
import Razorpay from "razorpay";
import connectDB from "@/db/connectDb";
import Admin from "@/models/admin";
import Dress from "@/models/dresses";
import ArtPiece from "@//models/artPiece";
import Accessory from "@/models/accessory";

export const POST = async (req) => {
  await connectDB();
  const rawBody = await req.text();
  const parsed = new URLSearchParams(rawBody);
  const body = Object.fromEntries(parsed.entries());

  console.log("Incoming Payment Data:", body);

  const p = await Order.findOne({ orderId: body.razorpay_order_id });
  if (!p) {
    return NextResponse.json({ success: false, message: "Order Id not found" });
  }

  const admin = await Admin.findOne();
  const secret = admin.razorpaysecret;

  const verified = validatePaymentVerification(
    { order_id: body.razorpay_order_id, payment_id: body.razorpay_payment_id },
    body.razorpay_signature,
    secret
  );

  // const verified = true;
  if (verified) {
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId: body.razorpay_order_id },
      { status: "paid", razorpay_payment_id: body.razorpay_payment_id },
      { new: true }
    );

    for (const item of updatedOrder.dressDetails) {
      const collectionType = item.CollectionType;

      if (collectionType === "Dresses" || collectionType === "Accessories") {
        const startDate = new Date(item.DeliveryDate);
        const rentalDays = parseInt(item.days);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + rentalDays);

        const model = collectionType === "Dresses" ? Dress : Accessory;

        await model.findByIdAndUpdate(item.id, {
          $push: {
            bookings: {
              userId: updatedOrder.userId, // Optional: Add userId if available
              startDate,
              endDate,
            },
          },
        });
      }

      if (collectionType === "ArtPieces") {
        await ArtPiece.findByIdAndUpdate(item.id, { isAvailable: false });
      }
    }

    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://sodra-collection-from-vision-to-vog.vercel.app"
        : "http://localhost:3000";

    return new Response(null, {
      status: 302,
      headers: {
        Location: `${baseUrl}/MyOrders?paymentdone=true`,
      },
    });
  } else {
    return NextResponse.json({
      success: false,
      message: "Payment Validation Failed",
    });
  }
};
