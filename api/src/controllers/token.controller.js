"use strict";

const Tokens = require("../models/token.model");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Tokens);
    res.status(200).send({
      error: false,
      data,
    });
  },
  create: async (req, res) => {
    req.body.isStaff = false;
    req.body.isAdmin = false;
    const data = await Tokens.create(req.body);
    res.status(201).send({
      error: false,
      message: "CREATED",
      data,
    });
  },
  read: async (req, res) => {
    const data = await Tokens.findOne({ _id: req.params.id });
    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    req.body.isStaff = false;
    req.body.isAdmin = false;
    const data = await Tokens.updateOne({ _id: req.params.id }, req.body);
    res.status(202).send({
      error: false,
      message: "UPDATED",
      data,
      new: await Tokens.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    const data = await Tokens.deleteOne({ _id: req.params.id });
    if (data.deletedCount > 0) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  },
};
