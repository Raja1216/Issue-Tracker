const mongoose = require("mongoose");

const labelShema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
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

const Label = mongoose.model("Labels", labelShema);

module.exports = Label;
