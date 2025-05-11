import mongoose, { Schema, model } from "mongoose";

const artPieceSchema = new Schema({
  name: { type: String },
  imageId: {type: Array},
  desc: { type: String },
  info: { type: String },
  price: { type: Number },
  type: { type: String },
  category: { type: String },
  tag: { type: String },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  madeBy: { type: String },
  code: {type: String },
  material: { type: String }
});

export default mongoose.models.ArtPiece || model("ArtPiece", artPieceSchema,"artPiece");
