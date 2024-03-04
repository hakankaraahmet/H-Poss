"use strict";

const { mongoose } = require("../configs/dbConnection");

const passwordEncrypt = require("../helpers/passwordEncrypt");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "username is required"],
      unique: [true, " This username is already used"],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "password is required"],
      set: (password) => passwordEncrypt(password),
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: [true, "This email is already used"],
      validate: [
        (email) => email.includes("@") && email.includes("."),
        "Email type is not correct",
      ],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "users", timestamps: true }
);

module.exports = mongoose.model("users", UserSchema);
