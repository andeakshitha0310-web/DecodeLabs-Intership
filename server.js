const express = require("express");

const app = express();

app.use(express.json());

let users = [];

// GET API
app.get("/users", (req, res) => {
  res.json(users);
});

// POST API
app.post("/users", (req, res) => {

  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      message: "Name and Email are required"
    });
  }

  const user = {
    id: users.length + 1,
    name,
    email
  };

  users.push(user);

  res.status(201).json({
    message: "User added successfully",
    user
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});