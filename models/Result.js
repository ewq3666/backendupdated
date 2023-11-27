const mongoose = require("mongoose");

const resultSchema = mongoose.Schema(
  {
    userId: {
      type: String,
    },
    marks: {
      type: String,
    },
    time: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("result", resultSchema);
