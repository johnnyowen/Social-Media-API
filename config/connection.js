// import mongoose database
const mongoose = require("mongoose");
// sets strict mode for queries to prevent unintended queries
mongoose.set("strictQuery", true);
// connecting to the database using MONGODB_URI as an environmental variable, and uses a local host if the first argument is not found
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/social-media-api"
);
// exporting the mongoose connection
module.exports = mongoose.connection;
