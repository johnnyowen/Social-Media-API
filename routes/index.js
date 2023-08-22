// imports Router object from express library so we can define and manage routes
const router = require("express").Router();
// imports apiRoutes from api folder
const apiRoutes = require("./api");
// prepends all routes from api folder with '/api'
router.use("/api", apiRoutes);
// gives an incorrect route message to all other routes
router.use((req, res) => res.send("Incorrect Route!"));
// exports the router object for use in other files
module.exports = router;
