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
const { postContest, getContest, deleteContest } = require("../controllers/admin");
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
router.get("/contest", isUser, getContest);

module.exports = router;
