const mongoose = require("mongoose");

const projectShema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    author: {
      type: String,
      require: true,
    },
    //Includes all the comments ids for this post
    issues: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Issues",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Projects", projectShema);

module.exports = Project;
