"use strict";

const router = require("express").Router();
const product = require("../controllers/product.controller");

router.get("/", product.list);
router.post("/add-product", product.create);
router
  .route("/:id")
  .get(product.read)
  .put(product.update)
  .patch(product.update)
  .delete(product.delete);

module.exports = router;
