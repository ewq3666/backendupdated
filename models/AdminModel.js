const mongoose = require("mongoose");

const contestSchema = mongoose.Schema(
    {
        name: String,
        price: String,
        leaderboard: Array,
        date: Date,  // Separate field for date
        time: String // Separate field for time
    },
    { timestamps: true }
);

module.exports = mongoose.model("contest", contestSchema);
