"use strict";

const router = require("express").Router();

router.use("/users", require("./user.router"));

module.exports = router;
