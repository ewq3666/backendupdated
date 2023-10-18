const asyncHandler = require("express-async-handler");
const Questions = require("../models/QuestionsModel");

exports.createQuestions = asyncHandler(async (req, res) => {
  console.log(req.body);
  await Questions.create(req.body);

  res.json({
    message: "Quetions Added Suucessfully",
  });
});
exports.fetchQuestions = asyncHandler(async (req, res) => {
  const result = await Questions.find();

  res.json({
    message: "Quetions fetch Suucessfully",
    result,
  });
});
exports.deleteQuetions = asyncHandler(async (req, res) => {
  await Questions.deleteMany();
  res.json({
    message: "Quetions Delete Suucessfully",
  });
});
