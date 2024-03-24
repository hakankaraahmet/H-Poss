"use strict";

const { mongoose } = require("../configs/dbConnection");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      unique: true,
    },
    image: {
      type: Array,
      required: [true, "image is required"],
      default: []
    },
    price: {
      type: Number,
      required: [true, "price is required"],
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    userId: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { collection: "products", timestamps: true }
);

module.exports = mongoose.model("products", ProductSchema);
