
const express = require("express"); 
const { registerAccount, login } = require("../controller/auth.controller");
const { notFound } = require("../middleware/error.middleware");
const authRoute = express.Router();

authRoute.post("/register", registerAccount );
authRoute.post("/login", login );


authRoute.all("*", notFound);
module.exports = authRoute;