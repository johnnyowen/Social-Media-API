// imports Router object from express library so we can define and manage routes
const router = require("express").Router();
// importing the thought and user routes so we can add defining endpoints
const thoughtRoutes = require("./thoughtRoutes");
const userRoutes = require("./userRoutes");
// setting up endpoint for thoughts '/api/thoughts'
router.use("/thoughts", thoughtRoutes);
// setting up endpoint for users '/api/users'
router.use("/users", userRoutes);
// exporting the router so we can use it in other files
module.exports = router;
