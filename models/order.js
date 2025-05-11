import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  username: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: { type: Number, required: true },
  dressDetails: { type: Array, required: true },
  orderId: { type: String, required: true },
  status: { type: String,enum: ["pending", "paid", "failed", "canceled"], default: "pending" }, // "pending", "paid"
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
