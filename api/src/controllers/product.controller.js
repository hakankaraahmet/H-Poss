"use strict";

const Product = require("../models/product.model");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Product, {}, ["categoryId", "userId"]);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Product),
      data,
    });
  },
  create: async (req, res) => {
    const { title } = req.body;
    req.body.image = "/img/" + req.file?.filename || [];
    const existingTitle = await Product.findOne({ title });

    if (existingTitle) {
      res.status(409).send({
        error: false,
        message: "This Product name is already used :(",
      });
    } else {
      const data = await Product.create(req.body);
      res.status(201).send({
        error: false,
        message: "CREATED",
        data,
      });
    }
  },
  read: async (req, res) => {
    const data = await Product.findOne({ _id: req.params.id }).populate([
      "categoryId",
      "userId",
    ]);
    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    const formerImage = await Product.findOne({ _id: req.params.id });
    req.body.image = req.file?.filename
      ? "/img/" + req.file?.filename
      : formerImage.image;
    const data = await Product.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });
    res.status(202).send({
      error: false,
      message: "UPDATED",
      data,
      new: await Product.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    const data = await Product.deleteOne({ _id: req.params.id });
    if (data.deletedCount > 0) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  },
};
