const express = require("express");
const mongoose = require("mongoose");
const addTodo = require("./router/addTodo");
const Todos = require("./models/todo");
const mothodOverride = require("method-override");

const app = express();
const port = 5000;

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(mothodOverride("_method"));

//connecting to mongodb
mongoose.connect(
  "mongodb+srv://anirban00537:anirban00537@cluster0.rsvp4.mongodb.net/todos",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.connection.once("open", function () {
  console.log("connection has been made");
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

//home route
app.get("/", async (req, res) => {
  const todos = await Todos.find().sort({
    createdAt: "desc",
  });
  res.render("todo_home", { todos: todos });
});

app.use("/addtodo", addTodo);

//server running on 5000
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
