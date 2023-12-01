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
        console.log(quizzes);
        contest.quizzes= JSON.parse(quizzes);

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

const Result = require('../models/Result');
const Quiz = require('../models/AdminModel')
router.post("/examsubmit/:contestId", async (req, res) => {
    try {
        const { userId, answers, time } = req.body;
        const contestId = req.params.contestId;
        // Fetch quiz questions for the specified contestId
        const user = await Result.find({ userId, contestId })
        if (user.length) {
            return res.status(400).json({ message: 'already submitted exam', already: true })
        }
        const contest = await Quiz.findById(contestId);

        if (!contest) {
            return res.status(404).json({ message: 'Contest not found for the specified contestId' });
        }

        const quizQuestions = contest.quizzes;
        if (quizQuestions.length !== answers.length) {
            return res.status(404).json({ message: 'Quiz questions not found for the specified contestId' });
        }

        // Calculate marks based on correct answers
        let obtainedMarks = 0;

        quizQuestions.forEach((question, index) => {

            if (answers[index] === question.correctOptionIndex.toString()) {
                obtainedMarks++;
            }
        });

        // Save the result to the database
        const result = new Result({
            userId,
            contestId,
            marks: obtainedMarks.toString(),
            time,
        });

        await result.save();

        res.status(200).json({ message: 'Exam result submitted successfully', obtainedMarks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get("/examsubmit/:contestId", async (req, res) => {
    const contestId = req.params.contestId;
    try {
        const result = await Result.find({ contestId })
        if (result.length) {
            console.log(contestId,result.length);
             res.status(200).json({ result })
        }
        else {
            return res.status(400).json({ message:'result not anounce yet' })
        }
    } catch (error) {
        return res.status(400).json({ isError: true, error })
    }

});
router.get("/examsubmit/:contestId/:userId", async (req, res) => {
    const contestId = req.params.contestId;
    const userId = req.params.userId;
    try {
        const result = await Result.find({ contestId,userId })
        if (result.length) {
            console.log(contestId,result.length);
             res.status(200).json({ result })
        }
        else {
            return res.status(400).json({ message:'result not anounce yet' })
        }
    } catch (error) {
        return res.status(400).json({ isError: true, error })
    }

});
router.get("/results/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
        const result = await Result.find({userId })
        if (result.length) {
             res.status(200).json({ result })
        }
        else {
            return res.status(400).json({ message:'result not anounce yet' })
        }
    } catch (error) {
        return res.status(400).json({ isError: true, error })
    }

});

// API endpoint to update ranks for a specific contest ID
router.put("/updateRanks/:contestId", async (req, res) => {
    try {
        const contestId = req.params.contestId;

        // Fetch all results for the specified contestId
        const results = await Result.find({ contestId });

        // Sort results based on time taken (lower time first) and obtained marks (higher marks first)
        results.sort((a, b) => {
            if (parseInt(b.marks) !== parseInt(a.marks)) {
                return parseInt(b.marks) - parseInt(a.marks);
            } else {
                return parseFloat(a.time) - parseFloat(b.time);
            }
        });
        

        // Update ranks in the sorted order
        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            await Result.findByIdAndUpdate(result._id, { rank: i + 1 }, { new: true });
        }

        res.status(200).json({ message: 'Ranks updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router