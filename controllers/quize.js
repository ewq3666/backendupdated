const router = require("express").Router();


router.post("/quize", async (req, res) => {
    try {
        const quize = await quizeModel.create(req.body);
        if (quize) {
            res.status(200).json(quize);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})
router.get("/quize", async (req, res) => {
    try {
        const quize = await quizeModel.find();
        if (quize) {
            res.status(200).json(quize);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})
router.delete("/quize/:id", async (req, res) => {
    const id = req.params.id
    try {
        const quize = await quizeModel.findByIdAndDelete({ _id: id }, req.body);
        if (quize) {
            res.status(200).json(quize);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

const QuizModel = require('../models/QuizModel')
// Route for admin to add quizzes
const Contest = require('../models/AdminModel'); // Import the Contest model

router.post("/add-quizzes/:contestId", async (req, res) => {
    const { contestId } = req.params;

    try {
        const { quizzes } = req.body;

        // Find the contest by ID
        const contest = await Contest.findById(contestId);

        if (!contest) {
            return res.status(404).json({ message: 'Contest not found' });
        }

        // Push new quizzes into the contest's quizzes array
        contest.quizzes.push(...quizzes);

        // Save the updated contest with the new quizzes
        const updatedContest = await contest.save();

        if (updatedContest) {
            res.status(200).json({ message: 'Quizzes added successfully', contest: updatedContest });
        } else {
            res.status(500).send('Internal Server Error');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


const UserQuestionHistoryModel = require('../models/QuizHistory')
// Assuming you have already stored quizzes in a QuizModel
let allQuizzes = []; // Fetch and store all quizzes from the database

router.get("/get-questions/:contestId", async (req, res) => {
    try {
        const { contestId } = req.params;

        // Retrieve questions for the specific contest (replace this logic with your database query)
        const questionsForContest = await Contest.find({ _id: contestId });

        // Get a random question for the specific contest
        // const randomQuestion = questionsForContest[Math.floor(Math.random() * questionsForContest.length)];

        if (questionsForContest) {
            res.status(200).json(questionsForContest);
        } else {
            res.status(500).send('No questions available for the specified contest');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router