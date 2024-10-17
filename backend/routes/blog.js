const express = require("express");
const { createBlog, updateBlog } = require("../payload");
const { Blog } = require("../db");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    createBlog.parse(req.body);
    const newBlog = new Blog(req.body);
    await newBlog.save();
    res.status(201).send(newBlog);
  } catch (err) {
    res.status(400).send(err.errors);
  }
});

router.put("/:id", async (req, res) => {
  try {
    updateBlog.parse({ id: req.params.id, ...req.body });
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBlog) return res.status(404).send("Blog not found");
    res.send(updatedBlog);
  } catch (err) {
    res.status(400).send(err.errors);
  }
});

router.get("/", async (req, res) => {
  const blogs = await Blog.find().populate("author");
  res.send(blogs);
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("author");
  if (!blog) return res.status(404).send("Blog not found");
  res.send(blog);
});

module.exports = router;
