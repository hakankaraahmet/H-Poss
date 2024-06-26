"use strict";

const Category = require("../models/category.model");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Category, {}, "userId");
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Category),
      data,
    });
  },
  create: async (req, res) => {
    const { title } = req.body;
    const existingTitle = await Category.findOne({ title });
    if (existingTitle) {
      res.status(409).send({
        error: false,
        message: "This category name is already used :(",
      });
    } else {
      const data = await Category.create(req.body);
      res.status(201).send({
        error: false,
        message: "CREATED",
        data,
      });
    }
  },
  read: async (req, res) => {
    const data = await Category.findOne({ _id: req.params.id }).populate(
      "userId"
    );
    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    const { title } = req.body;
    const existingTitle = await Category.findOne({ title });
    if (existingTitle) {
      res.status(409).send({
        error: false,
        message: "This category name is already used :(",
      });
    } else {
      const data = await Category.updateOne({ _id: req.params.id }, req.body, {
        runValidators: true,
      });
      res.status(202).send({
        error: false,
        message: "UPDATED",
        data,
        new: await Category.findOne({ _id: req.params.id }),
      });
    }
  },
  delete: async (req, res) => {
    const data = await Category.deleteOne({ _id: req.params.id });
    if (data.deletedCount > 0) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  },
};
