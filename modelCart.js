const mongoose = require("mongoose");
const schema = mongoose.schema;

let cartItems = new mongoose.Schema({
  items: String,
  price: Number,
  qty: Number,
});

module.exports = mongoose.model("cartItems", cartItems);
