const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
    {
        userId: String,
        username: String,
        balance: String,
        amountAdded:String,
        isWithdrawalRequest: Boolean,
        withdrawalAmount: Number, 
        isAproved:Boolean
    },
    { timestamps: true }
);

module.exports = mongoose.model("payment", paymentSchema);
