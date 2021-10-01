const express = require("express");
// const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
require("dotenv/config");
const router = require("./src/routes/routes");
const app = express();

//connect to mongodb database
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

// use the middleware
app.use(express.json());
app.use("/api", router);

app.listen("5001", () => console.log("server running at port 5001"));
