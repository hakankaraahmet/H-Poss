"use strict";

const { mongoose } = require("../configs/dbConnection");

const BillSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
    },
    customerPhoneNumber: {
      type: String,
      required: [true, "Customer phone is required"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
      enum: ["Cash", "Credit-Card"],
    },
    subTotal: {
      type: Number,
      required: [true, "Subtotal is required"],
    },
    tax: {
      type: Number,
      required: [true, "Tax is required"],
    },
    totalAmount: {
      type: Number,
      required: [true, "Total Amount is required"],
    },
    cartItems: {
      type: Array,
      required: [true, "Cart items is required"],
    },
    // userId: { //ALERT User id olayi eklenecek
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "users",
    //   required: true,
    // },
  },
  { collection: "bills", timestamps: true }
);

module.exports = mongoose.model("bills", BillSchema);
