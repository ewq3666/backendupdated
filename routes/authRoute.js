const {
	SignUpUser,
	FetchUser,
	Login,
	SignUpUserUpdate,
	SignUpUserDelete,
	getUser,
	sendMail,
	emailCheck,
} = require("../controllers/authController");
const { isUser } = require("../middleware/authProtected");
const { postContest, getContest, deleteContest, getContestId, joinContest, getContestsByUserId } = require("../controllers/admin");
const paymentModel = require("../models/AddPaymentModel");
const router = require("express").Router();

router.post("/signup", SignUpUser);
router.post("/email", emailCheck);
router.get("/", FetchUser);
router.put("/userinfo/:userId", SignUpUserUpdate);
router.delete("/userinfo/:userId", SignUpUserDelete);
router.post("/login", Login);
router.get("/user", isUser, getUser);
router.post("/mail", sendMail);
router.post("/admin/contest", postContest);
router.delete("/admin/contest/:id", deleteContest);
router.get("/admin/contest", getContest);
router.get("/admin/contest/:id", getContestId);
router.get("/contest", isUser, getContest);
router.post("/joincontest/:contestId/:userId",isUser, joinContest);
router.get("/getJoinedContest/:userId", getContestsByUserId);
module.exports = router;

const contest = require('../models/AdminModel')

router.put('/admin/updateContest/:id', async (req, res) => {
    const contestId = req.params.id;
    const { name, price, winnings, date, time, quizzes, users } = req.body;

    try {
        // Check if the contest exists
        const existingContest = await contest.findById(contestId);

        if (!existingContest) {
            return res.status(404).json({ message: 'Contest not found' });
        }

        // Update contest fields
        existingContest.name = name || existingContest.name;
        existingContest.price = price || existingContest.price;
        existingContest.winnings = winnings || existingContest.winnings;
        existingContest.date = date || existingContest.date;
        existingContest.time = time || existingContest.time;
        existingContest.quizzes = quizzes || existingContest.quizzes;
        existingContest.users = users || existingContest.users;

        // Save the updated contest
        const updatedContest = await existingContest.save();

        res.status(200).json({ contest: updatedContest });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});