require("dotenv").config();
const express = require("express");
const app = express();
// importing routes
const userRoutes = require("./routes/userRoutes");
const { connectionToDB } = require("./config/db");
// Connect to DB
connectionToDB();
// Importing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// getting all routes
app.use("/", userRoutes);

module.exports = app;
