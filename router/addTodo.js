const express = require("express");
const router = express.Router();
const Todos = require("../models/todo");

router.get("/", (req, res) => {
  res.render("add_todo");
});

router.post("/", (req, res) => {
  let todos = new Todos({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    todos.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  await Todos.findByIdAndDelete(req.params.id);
  console.log(req.params.id);
  res.redirect("/");
});

module.exports = router;
