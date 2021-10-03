const Hotel = require("./models/Hotel");
const axios = require("axios");
const LocationAPI = require("./Location");

const resolvers = {
  Query: {
    hello: () => {
      return "hello world";
    },

    Location: async () => {},

    getAllHotels: async () => {
      const docHotel = await Hotel.find();

      return docHotel;
    },
  },
};

module.exports = resolvers;
