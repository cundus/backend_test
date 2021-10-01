// import mongoose
const mongoose = require("mongoose");
const MUUID = require("uuid-mongodb");

// make Schema
const HotelListingSchema = mongoose.Schema({
  _id: {
    type: "object",
    value: { type: "Buffer" },
    default: () => MUUID.v4().toString(),
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  locationId: {
    type: "object",
    value: { type: "Buffer" },
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  totalRooms: {
    type: Number,
    required: true,
  },
});

// export model
module.exports = mongoose.model("Hotels", HotelListingSchema);
// Listing Hotel (id, name, price, locationId, imageUrl, totalRooms).
