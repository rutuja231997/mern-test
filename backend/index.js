const express = require("express");
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");

const app = express();
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/blogs", blogRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
