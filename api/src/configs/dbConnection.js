"use strict";

const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB CONNECTED"))
    .catch(() => console.log("DB IS NOT CONNECTED!!!"));
};

module.exports = {
  mongoose,
  dbConnection,
};
