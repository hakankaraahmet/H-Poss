"use strict";

const tokens = require("../controllers/token.controller");
const router = require("express").Router();

router.route("/").get(tokens.list).post(tokens.create);

router
  .route("/:id")
  .get(tokens.read)
  .patch(tokens.update)
  .put(tokens.update)
  .delete(tokens.delete);

module.exports = router;
