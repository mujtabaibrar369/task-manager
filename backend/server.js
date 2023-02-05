const dotenv = require("dotenv").config();
const express = require("express");
const connectDB = require("./configuration/connectDB");
const app = express();
const PORT = process.env.PORT || 3000;
const taskRoute = require("./routes/taskroute");
const bodyParser = require("body-parser");
const Task = require("./model/taskmodel");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/tasks", taskRoute);
app.get("/", (req, res) => {
  res.send("<h2>Welcome to homepage</h2>");
});
app.post("/", (req, res) => {
  res.send("POST Request Called");
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();
