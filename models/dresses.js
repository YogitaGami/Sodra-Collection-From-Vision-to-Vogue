import mongoose, { Schema, model } from "mongoose";

const dressSchema = new Schema({
  imageId: {type: Array},
  name: { type: String },
  desc: { type: String },
  price: { type: Map, of: Number },
  deposit: {type: Number},
  retail: {type: Number},
  fitting: {type:String},
  size: { type: String },
  type: { type: String },
  category: {type: String},
  tag: { type: String },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  bookings: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      startDate: Date,
      endDate: Date,
    }
  ],
  madeBy: { type: String },
  info: {type: String },
  code: {type: String },
  material: { type: String },
  stylistNote: { type: String },
  care: { type: String },
  color: { type: String },
});

export default mongoose.models.Dress || model("Dress", dressSchema);
