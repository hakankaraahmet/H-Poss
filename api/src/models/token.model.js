"use strict";

const { mongoose } = require("../configs/dbConnection");

const TokensSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      index:true
    },
    token: {
      type: String,
      trim: true,
      required: [true, "token is required"],
      index: true,
    },
  },
  { collection: "Tokens", timestamps: true }
);

module.exports = mongoose.model("Tokens", TokensSchema);
