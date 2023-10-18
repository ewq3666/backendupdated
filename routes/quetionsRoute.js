const {
  createQuestions,
  fetchQuestions,
  deleteAll,
  deleteQuetions,
} = require("../controllers/questionController");

const router = require("express").Router();

router
  .post("/question", createQuestions)
  .get("/question", fetchQuestions)
  .delete("/question/delete", deleteQuetions);
module.exports = router;
