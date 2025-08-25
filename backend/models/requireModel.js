import mongoose from "mongoose";

const requirementSchema = new mongoose.Schema({
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Receiver",
    required: true,
  },
  category: {
    type: String,
    enum: ["educational", "clothes"],
    required: true,
  },
  items: [
    {
      name: {
        type: String,
        required: true,
        enum: ["pen", "pencil", "books", "notebooks", "bag", "shirt", "pants", "sweater", "shoes", "jacket"],
      },
      quantity: { type: Number, required: true },
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Requirement = mongoose.model("Requirement", requirementSchema);
