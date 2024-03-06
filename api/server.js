"use strict";

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT ?? "8000";
require("express-async-errors");
// -------------------------------***-------------------------------

// --------***--------DB CONNECTION
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();
// --------***--------MIDDLEWARES
app.use(express.json());
app.use(require("./src/middlewares/authentication"));
app.use(require("./src/middlewares/findSearchSortPage"));

// --------***--------ROUTERS
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: `Welcome to ${process.env.PROJECT_NAME}`,
    isLogin: req.isLogin,
    user: req.user,
  });
});

app.use("/", require("./src/routes"));

// -------------------------------***-------------------------------

app.use(require("./src/middlewares/errorHandler"));

app.listen(PORT, () => {
  console.log(`The server is working on http://127.0.0.1:${PORT}`);
});
