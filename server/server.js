const app = require("./src/app");    
const dotenv = require("dotenv");
const dbConnection = require("./src/config/db.config");
const authRoute = require("./src/route/auth.route");
const { notFound, errorHandler } = require("./src/middleware/error.middleware");
dotenv.config(); 

app.use("/api/auth", authRoute);

app.all("*", notFound);
app.use(errorHandler);
const start = async () => {
  try {
    await dbConnection()  ;
    app.listen(process.env.SERVER_PORT, () => {
      console.log(`Server is running on port: ${process.env.SERVER_PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();

