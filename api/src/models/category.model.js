"use strict";

const { mongoose } = require("../configs/dbConnection");

const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { collection: "categories", timestamps: true }
);

module.exports = mongoose.model("categories", CategorySchema);
