"use strict";

const User = require("../models/user.model");
const Token = require("../models/token.model");

module.exports = async (req, res, next) => {
  req.isLogin = false;
  const auth = req.headers?.authorization || null;
  const tokenKey = auth ? auth.split(" ") : null;
  if (tokenKey && tokenKey[0] === "Token") {
    const tokenData = await Token.findOne({ token: tokenKey[1] }).populate(
      "userId"
    );
    if (tokenData) {
      req.user = await User.findOne({ _id: tokenData.userId });
      req.isLogin = true;
      req.body.userId = req.user._id;
    }
  }
  next();
};
