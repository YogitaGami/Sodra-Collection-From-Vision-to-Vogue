import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import connectDB from "@/db/connectDb";
import Order from "@/models/order";

export const POST = async (req) => {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { orderId } = await req.json();

  await connectDB();

  const updated = await Order.findOneAndUpdate(
    { orderId, username: session.user.name },
    { status: "received", receivedAt: new Date() },
    { new: true }
  );

  if (!updated) return new Response("Order not found", { status: 404 });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
