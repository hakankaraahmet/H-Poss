"use strict";

const Bill = require("../models/bill.model");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Bill, {}, "userId");
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Bill),
      data,
    });
  },
  create: async (req, res) => {
    const data = await Bill.create(req.body);
    res.status(201).send({
      error: false,
      message: "CREATED",
      data,
    });
  },
  read: async (req, res) => {
    const data = await Bill.findOne({ _id: req.params.id }).populate(
      "userId"
    );
    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    const data = await Bill.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });
    res.status(202).send({
      error: false,
      message: "UPDATED",
      data,
      new: await Bill.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    const data = await Bill.deleteOne({ _id: req.params.id });
    if (data.deletedCount > 0) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  },
};
