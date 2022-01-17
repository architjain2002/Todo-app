const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  // id is generated by mongodb
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  PhotoUrl: {
    type: String,
    required: true,
  },
});
const AuthModel = mongoose.model("authModel", authSchema);

module.exports = AuthModel;
