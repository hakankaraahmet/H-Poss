"use strict";

const User = require("../models/user.model");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(User);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(User),
      data,
    });
  },
  create: async (req, res) => {
    const { email, username } = req.body;
    const existingEmail = await User.findOne({ email });
    const existingUserName = await User.findOne({ username });
    if (existingEmail) {
      res.status(409).send({
        error: false,
        message: "This mail is already taken :(",
      });
    } else if (existingUserName) {
      res.status(409).send({
        error: false,
        message: "This user name is already taken :(",
      });
    } else {
      const data = await User.create(req.body);
      res.status(201).send({
        error: false,
        message: "CREATED",
        data,
      });
    }
  },
  read: async (req, res) => {
    const data = await User.findOne({ _id: req.params.id });
    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    const data = await User.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });
    res.status(202).send({
      error: false,
      message: "UPDATED",
      data,
      new: await User.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    const data = await User.deleteOne({ _id: req.params.id });
    if (data.deletedCount > 0) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  },
};
