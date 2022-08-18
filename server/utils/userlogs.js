const UserlogModel = require("../model/userlog.model");
const EventEmitter = require("events");
 

const Logger = new EventEmitter();

Logger.on("login", async(details) => {
  try {
    console.log("login is called");
    await UserlogModel.create({ ...details });
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
})

Logger.on("logout", async (details) => {
   try {
    await UserlogModel.create({ ...details });
   } catch (error) { 
     console.log(error);
    return { error: error.message };
  }
});

module.exports = Logger;