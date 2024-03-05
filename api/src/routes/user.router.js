"use strict";

const router = require("express").Router();
const user = require("../controllers/user.controller");

router.get("/", user.list);
router.post("/register", user.create);
router
  .route("/:id")
  .get(user.read)
  .put(user.update)
  .patch(user.update)
  .delete(user.delete);

module.exports = router;
