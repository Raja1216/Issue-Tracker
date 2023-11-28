const express = require("express");
const router = express.Router();
//Import Controller
const projectController = require("../controllers/projects_controller");

//Create Router
router.post("/create", projectController.create);

module.exports = router;
