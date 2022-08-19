
const express = require("express"); 
const { registerAccount, login, registerAdmin } = require("../controller/auth.controller");
const { userRequired } = require("../middleware/auth.middlware");
const { notFound } = require("../middleware/error.middleware");
const authRoute = express.Router();

authRoute.post("/register", registerAccount );
authRoute.post("/admin", registerAdmin );
authRoute.post("/login", login );
authRoute.post("/logout",userRequired, login );


authRoute.all("*", notFound);
module.exports = authRoute;