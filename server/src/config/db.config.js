const { connect } = require("mongoose");

const dbConnection = async () => {
  try {
    console.log("CONNECTING TO DATABASE....");
    await connect(`mongodb://localhost:${process.env.DB_PORT}/shop_db`);
    console.log("DATABASE CONNECTED...");
  } catch (error) {
    console.log(`Database connection ${{ err: error }}`);
    process.exit(-1);
  }
};

module.exports = dbConnection;