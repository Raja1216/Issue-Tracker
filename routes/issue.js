const express = require("express");
const router = express.Router();
//Import Controller
const issueController = require("../controllers/issue_controller");

//Create Router
router.post("/create/:id", issueController.create);

module.exports = router;
