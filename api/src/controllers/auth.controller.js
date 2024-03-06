"use strict";

const User = require("../models/user.model");
const Token = require("../models/token.model");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
      const user = await User.findOne({ email });
      if (user && user.password === passwordEncrypt(password)) {
        if (user.isActive) {
          let tokenData = await Token.findOne({ userId : user._id });
          if (!tokenData) {
            let tokenKey = passwordEncrypt(user._id + Date.now());
            tokenData = await Token.create({
              userId: user._id,
              token: tokenKey,
            });
          }
          res.send({
            error: false,
            token: tokenData.token,
            user,
          });
        } else {
          res.errorStatusCode = 401;
          throw new Error("User is not active");
        }
      } else {
        res.errorStatusCode = 401;
        throw new Error("Email or password is wrong");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Email and password is required");
    }
  },
  logout: async (req, res) => {
    const auth = req.headers?.authorization || null; // Token ...tokenKey...
    const tokenKey = auth ? auth.split(" ")[1] : null; // ['Token', '...tokenKey...']

    // Delete token from db:
    const tokenData = await Token.deleteOne({ token: tokenKey });

    res.send({
      error: false,
      message: "Logout was OK.",
      data: tokenData,
    });
  },
};
