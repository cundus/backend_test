// import mongoose
const mongoose = require("mongoose");
const MUUID = require("uuid-mongodb");

// make Schema
const BookSchema = mongoose.Schema({
  locationId: {
    type: "object",
    value: { type: "Buffer" },
    required: true,
  },
  hotelId: {
    type: "object",
    value: { type: "Buffer" },
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  userId: {
    type: "object",
    value: { type: "Buffer" },
    required: true,
  },
});

// export model
module.exports = mongoose.model("Book", BookSchema);
