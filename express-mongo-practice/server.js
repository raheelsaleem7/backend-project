require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/practice";

// MongoDB Connection
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongo db");
  })
  .catch((err) => {
    console.log(err.message || "Error connecting to mongo");
  });

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get("/api/ping", (res) => {
  res.json({ message: "heLOOO" });
});

// 404 Handler
app.use((res) => {
  res.status(404).json({ error: "route not found" });
});

// Global Error Handler
app.use((err, res) => {
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Port running on ${PORT}`);
});
