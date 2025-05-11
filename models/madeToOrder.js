import mongoose, { Schema, model } from "mongoose";

const madeToOrderSchema = new Schema({
  name: { type: String },
  imageId: {type: String},
  desc: { type: String },
  info: { type: String },
  type: { type: String },
  category: { type: String },
  tag: { type: String },
  madeBy: { type: String },
  material: { type: String },
  size: { type: Map, of: Number },
  code: { type: String },
  collectionType: { type: String },
}, { timestamps: true });

export default mongoose.models.MadeToOrder || model("MadeToOrder", madeToOrderSchema);
