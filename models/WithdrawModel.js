const mongoose = require("mongoose");

const widthdrawSchema = mongoose.Schema(
    {
        userId: String,
        amount: String,
        username: String
    },
    { timestamps: true }
);

module.exports = mongoose.model("widthdraw", widthdrawSchema);
