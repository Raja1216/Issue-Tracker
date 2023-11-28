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

//module.export.actionName = function(req, res) {}
