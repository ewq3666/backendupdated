const mongoose = require("mongoose");

const balanceSchema = mongoose.Schema(
    {
        userId: String,
        balance: String,
        username: String
    },
    { timestamps: true }
);

module.exports = mongoose.model("balance", balanceSchema);
