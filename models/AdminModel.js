const mongoose = require("mongoose");

const contestSchema = mongoose.Schema(
    {
        name: String,
        price: String,
        leaderboard: Array
    },
    { timestamps: true }
);

module.exports = mongoose.model("contest", contestSchema);
