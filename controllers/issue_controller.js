const Issue = require("../models/issues");
const Project = require("../models/projects");

module.exports.create = async function (req, res) {
  
  Project.findById(req.params.id)
    .then((project) => {
      const req_data = {
        title: req.body.issue_name,
        description: req.body.description,
        author: req.body.author_name,
        project_id: req.params.id,
      };
      Issue.create(req_data)
        .then((issue) => {
          project.issues.push(issue);
          project.save();
          return res.redirect("back");
        })
        .catch((err) => {
          console.log("Error in creating project", err);
          return res.redirect("back");
        });
    })
    .catch((err) => {
      console.log("Project id is Invalid", err);
      return;
    });
};
