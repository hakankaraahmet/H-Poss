"use strict";

const router = require("express").Router();

router.use("/auth", require("./auth.router"));
router.use("/users", require("./user.router"));
router.use("/categories", require("./category.router"));
router.use("/products", require("./product.router"));
router.use("/bills", require("./bill.router"));
router.use("/tokens", require("./token.router"));

module.exports = router;
