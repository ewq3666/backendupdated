const asyncHandler = require("express-async-handler");
const SignUp = require("../models/SignUpModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Resend } = require("resend");

exports.emailCheck = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    console.log(email);
    if (!email) {
      return res.status(200).send("please provide email")
    }
    if (email) {
      const found = await SignUp.findOne({ user_email: email });
      if (found) {
        return res.status(200).json({
          msg: "Email Already exist",
          registered: true
        });
      }
    }
    return res.status(200).json({
      msg: "no email register",
      registered: false
    });
  } catch (error) {
    return res.status(500).json({
      msg: "error"
    });
  }

});

exports.SignUpUser = asyncHandler(async (req, res) => {
  const { password } = req.body;

  try {

    const hashPass = await bcrypt.hash(password, 10);
    const result = await SignUp.create({
      ...req.body,
      password: hashPass,
    }); // req.body frontent date catch
    console.log(result);
    if (res) {
      res.json({
        message: "user signup successfully",
        data: result
      });

    }
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

// update user
exports.SignUpUserUpdate = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const result = await SignUp.findByIdAndUpdate(userId, req.body);
  res.json({ message: "user Updated successfully" });
});

// delete user
exports.SignUpUserDelete = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const result = await SignUp.findByIdAndDelete(userId);
  res.json({ message: "user Delete  successfully" });
});

exports.FetchUser = asyncHandler(async (req, res) => {
  const result = await SignUp.find();
  res.json({
    msg: "User Fetch Success",
    result,
  });
  res.json({
    message: "user fetch successfully",
  });
});

exports.Login = asyncHandler(async (req, res) => {
  const { user_email, password } = req.body;
  console.log(req.body);
  const result = await SignUp.findOne({ user_email });

  if (!result) {
    return res.status(401).json({ msg: "Email is not registered with us" });
  }
  // console.log(result);
  const match = await bcrypt.compare(password, result.password);
  if (!match) {
    return res.status(401).json({ msg: "Password Do Not Match" });
  }
  const token = jwt.sign({ result }, process.env.JWT_KEY);

  res.json({
    msg: "Login Success",
    result: {
      _id: result._id,
      name: result.name,
      email: result.email,
      token,
    },
  });
});

exports.getUser = asyncHandler(async (req, res) => {
  const headers = req.headers.authorization;
  jwt.verify(headers, process.env.JWT_KEY, function (err, decoded) {
    // err
    // decoded undefined
    res.status(200).json(decoded);
    console.log(decoded);
  });
});

exports.sendMail = async () => {
  const resend = new Resend("re_XbvFoC1i_KTUnicYCSKxsPjApJ9DgkSr4");

  const res = await resend.emails.send({
    from: "earnwithquizee@gmail.com",
    to: ["prede46@resend.dev"],
    subject: "hello world",
    text: "it works!",
    attachments: [
      {
        filename: "invoice.pdf",
        content: invoiceBuffer,
      },
    ],
    headers: {
      "X-Entity-Ref-ID": "123456789",
    },
    tags: [
      {
        name: "category",
        value: "confirm_email",
      },
    ],
  });
  console.log(res);
};
