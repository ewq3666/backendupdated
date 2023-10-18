const mongoose = require("mongoose");

const questionSchema = mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("questions", questionSchema);
