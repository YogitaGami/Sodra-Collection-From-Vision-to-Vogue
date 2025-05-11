// models/MadeToOrderSubmission.js
import mongoose, { Schema, model } from "mongoose";

const madeToOrderSubmissionSchema = new Schema({
  referenceId: {
    type: Schema.Types.ObjectId,
    ref: "MadeToOrder",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true,
  },
  userInfo: {
    name: { type: String },
    email: { type: String }
  },
  measurement: {
    type: Map,
    of: Number,
    required: true,
  },
  changes: {
    type: String,
    default: "",
  }
}, { timestamps: true });

export default mongoose.models.MadeToOrderSubmission ||
  model("MadeToOrderSubmission", madeToOrderSubmissionSchema);
