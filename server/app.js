const express = require("express");
const dotenv = require("dotenv");
const dbConnection = require("./config/db.config");
const { notFound, errorHandler } = require("./middleware/error.middleware");
const authRoute = require("./route/auth.route");
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use("/api/status", (req, res) => {
  res.status(200).json({ msg: "OK" });
});

app.use("/api/auth", authRoute);

app.use("*", notFound);
app.use(errorHandler);
const start = async () => {
  try {
    await dbConnection();
    app.listen(process.env.SERVER_PORT, () => {
      console.log(`Server is running on http://localhost: ${process.env.SERVER_PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();

