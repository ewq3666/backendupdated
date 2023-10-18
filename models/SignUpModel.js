const mongoose = require("mongoose");

const SignUpSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    user_email: {
      type: String,
    },
    upi: {
      type: String,
    },
    mobile: {
      type: String,
    },
    password: {
      type: String,
    },
    refaral: {
      type: String,
    },
    yourstate: {
      type: String,
    },
    district: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", SignUpSchema);
