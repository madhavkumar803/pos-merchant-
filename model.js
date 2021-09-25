const mongoose = require("mongoose");
const schema = mongoose.schema;

let Items = new mongoose.Schema({
  items: String,
  price: Number,
  qty: Number,
});

module.exports = mongoose.model("Items", Items);
