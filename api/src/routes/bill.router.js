"use strict";

const router = require("express").Router();
const bill = require("../controllers/bill.controller");

router.get("/", bill.list);
router.post("/add-bill", bill.create);
router
  .route("/:id")
  .get(bill.read)
  .put(bill.update)
  .patch(bill.update)
  .delete(bill.delete);

module.exports = router;
