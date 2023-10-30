const mongoose = require("mongoose");

const QuizeModel = mongoose.Schema(
    {
        question: Array,
        contestId: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("quize", QuizeModel);
