const express = require("express");
const { createUser, updateUser } = require("../payload");
const { User } = require("../db");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    createUser.parse(req.body);
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send(newUser);
  } catch (err) {
    res.status(400).send(err.errors);
  }
});

router.put("/:id", async (req, res) => {
  try {
    updateUser.parse({ id: req.params.id, ...req.body });
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) return res.status(404).send("User not found");
    res.send(updatedUser);
  } catch (err) {
    res.status(400).send(err.errors);
  }
});

router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("User not found");
  res.send(user);
});

module.exports = router;
