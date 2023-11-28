const Project = require("../models/projects");

module.exports.home = async function (req, res) {
  try {
    let projects = await Project.find({}).sort("-createdAt");
    return res.render("home", {
      projects: projects,
    });
  } catch (err) {
    console.log("Error", err);
    return res.redirect("back");
  }
};

//module.export.actionName = function(req, res) {}
