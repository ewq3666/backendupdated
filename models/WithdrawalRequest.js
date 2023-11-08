const mongoose = require("mongoose");

const withdrawalRequestSchema = mongoose.Schema(
    {
        userId: String,
        amount: String,
        status: String,
        username: String
    },
    { timestamps: true }
);

module.exports = mongoose.model("WithdrawalRequest", withdrawalRequestSchema);
