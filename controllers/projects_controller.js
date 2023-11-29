const Project = require("../models/projects");

module.exports.create = async function (req, res) {
  const req_data = {
    name: req.body.project_name,
    description: req.body.description,
    author: req.body.author_name,
  };
  Project.create(req_data)
    .then((result) => {
      return res.redirect("back");
    })
    .catch((err) => {
      console.log("Error in creating project", err);
      return res.redirect("back");
    });
};
module.exports.details = async function (req, res) {
  Project.findById(req.params.id)
    .populate("issues")
    .then((result) => {
      console.log(result);
      return res.render("project_details", {
        project_details: result,
      });
    })
    .catch((err) => {
      console.log("Error in Project find", err);
      return res.redirect("back");
    });
};

//module.export.actionName = function(req, res) {}
