const express = require("express");
const router = express.Router();
//Import Controller
const homeController = require("../controllers/home_controller");

//Create Router
router.get("/", homeController.home);
// If Request is comming from projects that go to projects router
router.use("/projects", require("./projects"));
// //If Request is comming from posts that go to posts router
router.use("/issues", require("./issue"));

module.exports = router;
