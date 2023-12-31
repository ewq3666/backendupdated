const mongoose = require("mongoose");

const AddPaymentModel = mongoose.Schema(
    {
        userId: String,
        user_email: String,
        orderId: String,
        amount: Number
    },
    { timestamps: true }
);

module.exports = mongoose.model("addPayment", AddPaymentModel);
