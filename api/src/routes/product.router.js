"use strict";

const router = require("express").Router();
const product = require("../controllers/product.controller");
const upload = require('../middlewares/upload')

router.get("/", product.list);
router.post("/add-product",upload.single('image'), product.create);
router
  .route("/:id")
  .get(product.read)
  .put(upload.single('image'),product.update)
  .patch(upload.single('image'),product.update)
  .delete(product.delete);

module.exports = router;
