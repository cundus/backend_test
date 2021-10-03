const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");

const app = express();
const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");
const server = new ApolloServer({ typeDefs, resolvers });

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  mongoose
    .connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(err));

  app.listen({ port: 5004 }, () => {
    console.log("Server listening at Port 5004");
  });
};

startServer();
