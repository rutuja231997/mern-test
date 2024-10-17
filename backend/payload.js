const zod = require("zod");

const createUser = zod.object({
  name: zod.string().min(1, "Name is required"),
  email: zod.string().email("Invalid email format"),
  password: zod.string().min(6, "Password must be at least 6 characters long"),
});

const updateUser = zod.object({
  id: zod.string(),
  name: zod.string().optional(),
  email: zod.string().email("Invalid email format").optional(),
  password: zod
    .string()
    .min(6, "Password must be at least 6 characters long")
    .optional(),
});

// Blog Payload Schemas
const createBlog = zod.object({
  title: zod.string().min(1, "Title is required"),
  content: zod.string().min(1, "Content is required"),
  author: zod.string(),
  topics: zod.array(zod.string()).optional(),
});

const updateBlog = zod.object({
  id: zod.string(),
  title: zod.string().optional(),
  content: zod.string().optional(),
  topics: zod.array(zod.string()).optional(),
});

// Comment Payload Schemas
const createComment = zod.object({
  blogId: zod.string(),
  commenter: zod.string(),
  content: zod.string().min(1, "Comment content is required"),
});

const updateComment = zod.object({
  id: zod.string(),
  content: zod.string().optional(),
});

module.exports = {
  createUser,
  updateUser,
  createBlog,
  updateBlog,
  createComment,
  updateComment,
};
