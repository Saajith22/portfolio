const mongoose = require("mongoose");

module.exports = mongoose.model(
  "users",
  new mongoose.Schema({
    Email: String,
    Password: String,
    Username: String,
    Chats: Array
  })
);