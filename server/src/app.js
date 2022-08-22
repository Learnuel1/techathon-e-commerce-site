const express = require("express");
const dotenv = require("dotenv");

const morgan = require("morgan");
const cors = require("cors");
dotenv.config();
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use("/api/status", (req, res) => {
  res.status(200).json({ msg: "OK" });
});


module.exports = app;