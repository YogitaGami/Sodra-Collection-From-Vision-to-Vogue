import mongoose, { Schema, model } from "mongoose";

const accessorySchema = new Schema({
  name: { type: String },
  imageId: {type: Array},
  desc: { type: String },
  price: { type: Map, of: Number },
  deposit: {type: Number},
  retail: {type: Number},
  info: { type: String },
  type: { type: String },
  category: { type: String },
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
  code: {type: String },
  material: { type: String }
});

export default mongoose.models.Accessory || model("Accessory", accessorySchema);
