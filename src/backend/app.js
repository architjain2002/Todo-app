// modules exported and middlewares
const express = require("express");
const app = express();
const http = require("http");
const fs = require("fs");
const server = http.createServer(app);
const path = require("path");
const { find } = require("async");

// middleware for testing
app.use(express.json());

// hostname and port
const hostname = "192.168.0.104"; // ignore for deployment
const port = process.env.PORT || 3000;

//database connections
const mongoose = require("mongoose");

// models import
const AuthModel = require("./models/authModel");

// route to post auth data from react to mongodb
app.post("/authData", (req, res) => {
  const authObj = new AuthModel(req.body);
  authObj.find({ Name: req.body.Name }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
  // .then((result) => {
  //   res.end("inserted a new data");
  // })
  // .catch((err) => {
  //   res.end("error in insertion");
  // });
});
// connect to the mongodb database
mongoose
  .connect("mongodb://localhost:27017/todo-app", {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log("mongodb connected!");
  })
  .catch((err) => {
    console.log(err);
  });

server.listen(port, hostname, () => {
  console.log(`server running`);
});
