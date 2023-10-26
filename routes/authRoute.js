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
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { postContest, getContest, deleteContest } = require("../controllers/admin");
// const paymentModel = require("../models/paymentModel");
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
router.get("/admin/contest", getContest);
router.get("/contest", isUser, getContest);
router.delete("/admin/contest/:id", deleteContest);

// router.post('/addmoney', async (req, res) => {
// 	try {
// 		const { userId, amount } = req.body;

// 		// Create a new payment record
// 		const newPaymentRecord = await paymentModel.create({
// 			userId,
// 			balance: amount, // Set the initial balance to `amount`
// 			isWithdrawalRequest: false,
// 			withdrawalAmount: 0
// 		});

// 		if (newPaymentRecord) {
// 			res.status(200).send('Money added successfully');
// 		} else {
// 			res.status(500).send('Internal Server Error');
// 		}
// 	} catch (error) {
// 		console.error(error);
// 		res.status(500).send('Internal Server Error');
// 	}
// });
// Assuming you have a route like '/withdrawal' for users to request withdrawals

// router.post('/withdrawal', async (req, res) => {
// 	try {
// 		const { userId, withdrawalAmount } = req.body;

// 		// Create a new withdrawal request
// 		const newWithdrawalRequest = await paymentModel.create({
// 			userId,
// 			withdrawalAmount,
// 			isWithdrawalRequest: true,
// 			isAproved: false
// 		});

// 		if (newWithdrawalRequest) {
// 			res.status(200).send('Withdrawal request created successfully');
// 		} else {
// 			res.status(500).send('Internal Server Error');
// 		}
// 	} catch (error) {
// 		console.error(error);
// 		res.status(500).send('Internal Server Error');
// 	}
// });
// router.get('/admin/withdrawal-requests', async (req, res) => {
// 	try {
// 	  // Find all withdrawal requests where isApproved is false
// 	  const withdrawalRequests = await paymentModel.find({ isAproved: false });
//   if (withdrawalRequests) {
// 	  res.status(200).json(withdrawalRequests);
//   }
// 	} catch (error) {
// 	  console.error(error);
// 	  res.status(500).send('Internal Server Error');
// 	}
//   });
router.post("/orders", async (req, res) => {
	try {
		const instance = new Razorpay({
			key_id: process.env.KEY_ID,
			key_secret: process.env.KEY_SECRET,
		});

		const options = {
			amount: req.body.amount * 100,
			currency: "INR",
			receipt: crypto.randomBytes(10).toString("hex"),
		};

		instance.orders.create(options, (error, order) => {
			if (error) {
				console.log(error);
				return res.status(500).json({ message: "Something Went Wrong!" });
			}
			res.status(200).json({ data: order });
		});
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
});

router.post("/verify", async (req, res) => {
	try {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
			req.body;
		const sign = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSign = crypto
			.createHmac("sha256", process.env.KEY_SECRET)
			.update(sign.toString())
			.digest("hex");

		if (razorpay_signature === expectedSign) {
			return res.status(200).json({ message: "Payment verified successfully" });
		} else {
			return res.status(400).json({ message: "Invalid signature sent!" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
});

module.exports = router;
