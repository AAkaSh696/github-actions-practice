const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const PORT = 5000;

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema
const User = mongoose.model("User", {
  name: String
});

// Routes
app.get("/", (req, res) => {
  res.send("Hello from Node + Mongo App");
});

app.post("/users", async (req, res) => {
  const user = new User({ name: req.body.name });
  await user.save();
  res.json(user);
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});