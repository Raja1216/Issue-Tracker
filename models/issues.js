const mongoose = require("mongoose");

const issueShema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    labels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Labels",
      },
    ],
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Projects",
    },
    author: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Issue = mongoose.model("Issues", issueShema);

module.exports = Issue;
