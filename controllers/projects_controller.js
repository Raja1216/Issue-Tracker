const Project = require("../models/projects");
const Issue = require("../models/issues");

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
  let find_obj = { project_id: req.params.id };
  console.log("params", req.params);
  query = null;
  if (Object.keys(req.query).length > 0) {
    query = req.query;
    // Check search input given or not
    if (req.query.search_input && req.query.search_input.length > 0) {
      find_obj = {
        project_id: req.params.id,
        $or: [
          // in this we want to search at two fields 'Description' and 'Brand'
          { title: { $regex: req.query.search_input, $options: "i" } },
          { description: { $regex: req.query.search_input, $options: "i" } },
        ],
      };
    }
    //Check author given or not
    if (req.query.authors && req.query.authors.length > 0) {
      find_obj.author = {
        $in: req.query.authors,
      };
    }
    //Check labels given or not
    if (req.query.labels && req.query.labels.length > 0) {
      find_obj.labels = {
        $in: req.query.labels,
      };
    }
    console.log("find_obj", find_obj);

    Project.findById(req.params.id)
      .then((result) => {
        Issue.find(find_obj)
          .then((i_result) => {
            console.log("i_result", i_result);
            result.issues = i_result;
            return res.render("project_details", {
              project_details: result,
              p_query: query,
            });
          })
          .catch((err) => {
            console.log("Error in Issue Filter", err);
            return res.redirect("back");
          });
      })
      .catch((err) => {
        console.log("Error in Project find", err);
        return res.redirect("back");
      });
  }
  else {
    Project.findById(req.params.id)
      .populate("issues")
      .then((result) => {
        console.log("Here", result);
        return res.render("project_details", {
          project_details: result,
          p_query: query,
        });
      })
      .catch((err) => {
        console.log("Error in Project find", err);
        return res.redirect("back");
      });
  }
  console.log(query);
};

//module.export.actionName = function(req, res) {}

// module.exports.details = async function (req, res) {
//   console.log(Object.keys(req.query).length);
//   console.log(req.query);
//   if (Object.keys(req.query).length > 0) {
//     Project.findById(req.params.id)
//       .populate({
//         path: "issues",
//         match: { author: { $in: req.query.authors } },
//       })
//       .then((result) => {
//         console.log(result);
//         return res.render("project_details", {
//           project_details: result,
//         });
//       })
//       .catch((err) => {
//         console.log("Error in Project find", err);
//         return res.redirect("back");
//       });
//   }

//   Project.findById(req.params.id)
//     .populate("issues")
//     .then((result) => {
//       console.log("Here", result);
//       return res.render("project_details", {
//         project_details: result,
//       });
//     })
//     .catch((err) => {
//       console.log("Error in Project find", err);
//       return res.redirect("back");
//     });
// };
