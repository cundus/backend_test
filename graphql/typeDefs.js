const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Location {
    name: String
  }
  type Hotel {
    id: ID
    name: String
    price: Int
    location: Location
    imageUrl: String
    totalRooms: Int
  }

  type Query {
    hello: String
    Location: String
    getAllHotels: [Hotel]
  }
`;
module.exports = typeDefs;
