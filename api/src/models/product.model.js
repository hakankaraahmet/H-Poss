"use strict";

const { mongoose } = require("../configs/dbConnection");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      unique: true,
    },
    img: {
      type: String,
      required: [true, "image is required"],
    },
    price: {
      type: Number,
      required: [true, "price is required"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    createdId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { collection: "products", timestamps: true }
);

module.exports = mongoose.model("products", ProductSchema);
