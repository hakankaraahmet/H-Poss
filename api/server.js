"use strict";

const express = require("express");
const app = express();


require("dotenv").config();
const PORT = process.env.PORT ?? "8000";
// -------------------------------***-------------------------------

// --------***--------DB CONNECTION
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();
// --------***--------

app.get("/", (req, res) => res.send("Hello H-POS"));




// -------------------------------***-------------------------------

app.listen(PORT, () => {
  console.log(`The server is working on http://127.0.0.1:${PORT}`);
});
