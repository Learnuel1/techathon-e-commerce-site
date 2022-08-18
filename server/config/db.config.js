const { connect } = require("mongoose");

const dbConnection = async () => {
  console.log("CONNECTING TO DATABASE....");
  await connect(`mongodb://localhost:${process.env.DB_PORT}/shop_db`);
  console.log("DATABASE CONNECTED...");
};

module.exports = dbConnection;