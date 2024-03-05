"use strict";

const router = require("express").Router();

router.use("/users", require("./user.router"));
router.use("/categories", require("./category.router"));
router.use("/products", require("./product.router"));
router.use("/bills", require("./bill.router"));

module.exports = router;
