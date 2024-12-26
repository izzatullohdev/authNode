const mongose = require("mongoose");

const coonectDB = async () => {
  try {
    await mongose.connect(process.env.MONGO_URI);
    console.log("DB connected".bgGreen);
  } catch (error) {
    console.log(error);
  }
};

module.exports = coonectDB;
