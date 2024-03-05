"use strict";

const router = require("express").Router();
const category = require("../controllers/category.controller");

router.get("/", category.list);
router.post("/add-category", category.create);
router
  .route("/:id")
  .get(category.read)
  .put(category.update)
  .patch(category.update)
  .delete(category.delete);

module.exports = router;
