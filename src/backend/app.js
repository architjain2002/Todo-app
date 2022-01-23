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
// const hostname = "192.168.0.104"; // ignore for deployment
const hostname = "192.168.0.104";
const port = process.env.PORT || 3000;

//database connections
const mongoose = require("mongoose");

// models import
const AuthModel = require("./models/authModel");

// route to post auth data from react to mongodb
app.post("/authData", (req, res) => {
  const authObj = new AuthModel(req.body);
  AuthModel.findOne({ Email: req.body.Email }, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } else {
      if (data == null) {
        authObj.save();
      } else {
        console.log(data);
      }
      res.sendStatus(200);
    }
  });
});
app.get("/getTodo", (req, res) => {
  AuthModel.find({ Email: req.query.Email }, "TodoList", (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } else {
      console.log(data[0]);
      arr = [];
      // if (data[0].TodoList != undefined)
      for (let index = 0; index < data[0]["TodoList"].length; index++) {
        console.log(data[0]["TodoList"][index].text);
        obj = {
          text: data[0].TodoList[index].text,
          key: data[0].TodoList[index].key,
        };
        arr[index] = obj;
      }
      console.log(arr);
      res.send(arr);
    }
  });
});

app.post("/todoDelete", (req, res) => {
  AuthModel.updateOne(
    {
      Email: req.body.Email,
      // TodoList: { $elemMatch: { val: req.body.TodoList[0].val } },
      // TodoList: { $elemMatch: { val: req.body.val } },
    },
    { $pull: { TodoList: { key: req.body.key } } }
  )
    .then((data) => {
      console.log(data);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.post("/todoUpdate", (req, res) => {
  AuthModel.updateMany(
    {
      Email: req.body.Email,
      // TodoList: { $elemMatch: { val: req.body.TodoList[0].val } },
      // TodoList: { $elemMatch: { val: req.body.val } },
    },
    { $push: { TodoList: { text: req.body.text, key: req.body.key } } }
  )
    .then((data) => {
      console.log(data);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

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
