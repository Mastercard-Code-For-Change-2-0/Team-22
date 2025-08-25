import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Donor", // foreign key
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Receiver", // foreign key
    required: true,
  },
  requirement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Requirement", // link to the request
    required: true,
  },
  itemsDonated: [
    {
      name: { type: String, required: true },   // e.g. books, shirts
      quantity: { type: Number, required: true, min: 1 },
    }
  ],
  status: {
    type: String,
    enum: ["pending", "accepted", "completed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Donation = mongoose.model("Donation", donationSchema);
