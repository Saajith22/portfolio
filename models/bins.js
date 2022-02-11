const mongoose = require("mongoose");

module.exports = mongoose.model(
  "bins",
  new mongoose.Schema({
    ID: String,
    Bins: Array
  })
);