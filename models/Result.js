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
    contestId: {
      type: String
    },
    rank: {
      type: Number
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("result", resultSchema);
