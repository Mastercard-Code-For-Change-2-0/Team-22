import mongoose from "mongoose";

const receiverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
  },
  password: {
    type: String,
    required: true,
  }
});

export const Receiver = mongoose.model("Receiver", receiverSchema);
