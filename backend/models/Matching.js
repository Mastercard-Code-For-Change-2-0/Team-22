const mongoose = require("mongoose");

const matchingSchema = new mongoose.Schema({
  requirement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Requirement",
    required: true,
  },
  donation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Donation",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Receiver",
    required: true,
  },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Donor",
    required: true,
  },
  matchedItems: [
    {
      itemName: {
        type: String,
        required: true,
      },
      requiredQuantity: {
        type: Number,
        required: true,
      },
      donatedQuantity: {
        type: Number,
        required: true,
      },
      matchedQuantity: {
        type: Number,
        required: true,
      }
    }
  ],
  category: {
    type: String,
    enum: ["educational", "clothes"],
    required: true,
  },
  matchScore: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "disapproved"],
    default: "pending",
  },
  adminNotes: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  reviewedAt: {
    type: Date,
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  }
});

// Index for better query performance
matchingSchema.index({ status: 1, createdAt: -1 });
matchingSchema.index({ category: 1, status: 1 });

const Matching = mongoose.model("Matching", matchingSchema);
module.exports = Matching;