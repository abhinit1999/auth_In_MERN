const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const DB = process.env.DB_URL;

mongoose
  .connect(DB)
  .then(() => {
    console.log(`connected to mongoose`);
  })
  .catch((e) => {
    console.log(e);
  });
