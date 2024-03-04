"use strict";

const crypto = require("node:crypto");

const keyCode = process.env.SECRET_KEY;
const loopCount = 10_000;
const charsCount = 32; //write 32 for 64
const encType = "sha512";

module.exports = function(password){
  const encode = crypto.pbkdf2Sync(
    password,
    keyCode,
    loopCount,
    charsCount,
    encType
  );

  return encode.toString("hex");
};