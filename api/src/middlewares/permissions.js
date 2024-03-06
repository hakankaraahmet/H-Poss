"use strict";

module.exports = {
  isLogin: (req, res, next) => {
    if (process.env.NODE_ENV !== "production") return next();
    if (req.user && req.user.isActive) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error("You must login");
    }
  },
  isAdmin: (req, res, next) => {
    if (process.env.NODE_ENV !== "production") return next();
    if (req.user && req.user.isActive && req.user.isAdmin) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error("You must login and you must be Admin");
    }
  },
};
