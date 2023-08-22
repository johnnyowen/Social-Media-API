// importing the express library for creating the server
const express = require("express");
// importing the mongoose connection
const db = require("./config/connection");
// importing the routes
const routes = require("./routes");
// setting a port variable
const PORT = 3001;
// creating an instance of the express server called 'app'
const app = express();

// setting up middleware to parse incoming json request bodies and using routes to handle incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// waits for the Mongoose database connection to be established before starting the server on a specified port and uses a callback function to send a message that the server is up and running
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
