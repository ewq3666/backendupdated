const { isUser } = require("../middleware/authProtected");
const paymentModel = require("../models/AddPaymentModel");
const balanceModel = require('../models/BalanceModel')
const router = require("express").Router();

router.get('/addmoney', async (req, res) => {
	try {
		// Create a new payment record
		const payment = await paymentModel.find();

		if (payment) {
			res.status(200).send(payment);
		} else {
			res.status(500).send('Internal Server Error');
		}
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
});
router.get('/addmoney/:id', async (req, res) => {

	try {
		// Create a new payment record
		const payment = await paymentModel.find({userId:req.params.id});

		if (payment) {
			res.status(200).send(payment);
		} else {
			res.status(500).send('Internal Server Error');
		}
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
});
router.post('/addmoney', async (req, res) => {
	try {
		const { userId, amount } = req.body;

		// Find the current balance of the user
		let userBalance = await balanceModel.findOne({ userId });

		if (!userBalance) {
			// If user doesn't have a balance, create a new record
			userBalance = await balanceModel.create({
				userId,
				balance: amount, // Initialize with the new amount
				username: req.body.username // Replace with the actual username
			});
		} else {
			// Add the new amount to the current balance
			userBalance.balance = parseFloat(userBalance.balance) + parseFloat(amount);
			// Update the balance in the database
			userBalance = await userBalance.save();
		}

		// Create a new payment record
		const newPaymentRecord = await paymentModel.create(req.body);

		if (newPaymentRecord && userBalance) {
			res.status(200).send('Money added successfully');
		} else {
			res.status(500).send('Internal Server Error');
		}
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
});

router.post("/addmoney/:id", isUser, async (req, res) => {
	const userId = req.params.id
	try {
		const user = await paymentModel.findOneAndUpdate({ userId }, req.body);
		console.log(user);
		if (user) {
			res.status(200).json(user);
		}
	} catch (error) {
		const { amount, username, userId } = req.body
		try {
			const user = await paymentModel.create({ username, amount, userId });
			if (user) {
				res.status(200).json(user);
			}
		} catch (error) {
			console.error(error, "here is user");
			res.status(500).send('Internal Server Error');
		}

	}
})
const userBalance = require('../models/BalanceModel');
const WithdrawModel = require("../models/WithdrawModel");
router.get("/balance", async (req, res) => {
	try {
		const users = await userBalance.find();
		if (users) {
			res.status(200).json(users);
		}
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
})
// router.post("/balance/:id", isUser, async (req, res) => {
// 	const userId = req.params.id
// 	try {
// 		const user = await userBalance.findOneAndUpdate({ userId }, req.body);
// 		console.log(user);
// 		if (user) {
// 			res.status(200).json(user);
// 		}
// 	} catch (error) {
// 		const { balance, username, userId } = req.body
// 		try {
// 			const user = await userBalance.create({ balance, username, userId });
// 			if (user) {
// 				res.status(200).json(user);
// 			}
// 		} catch (error) {
// 			console.error(error, "here is user");
// 			res.status(500).send('Internal Server Error');
// 		}

// 	}
// })

const widthdrawModel = require('../models/WithdrawModel')
router.get("/withdraw", async (req, res) => {
	try {
		const users = await widthdrawModel.find();
		if (users) {
			res.status(200).json(users);
		}
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
})

// Route for admin to approve a withdrawal request
router.post("/withdraw/:id", async (req, res) => {
	const requestId = req.params.id;
	try {
		const { amount, username, userId } = req.body;

		// Find the current balance of the user
		let userBalance = await balanceModel.findOne({ userId: userId });
		console.log(userBalance);
		if (!userBalance || parseFloat(userBalance.balance) < parseFloat(amount)) {
			return res.status(400).send('Insufficient balance');
		}

		// Subtract the withdrawal amount from the current balance
		userBalance.balance = parseFloat(userBalance.balance) - parseFloat(amount);

		// Update the balance in the database
		userBalance = await userBalance.save();

		// Update the withdrawal request status to completed
		const updatedWithdrawalRequest = await WithdrawalRequestModel.findOneAndUpdate(
			{ _id: requestId },
			{ status: "completed" },
		);

		// Create a new withdrawal record
		const newWithdrawalRecord = await WithdrawModel.create({
			userId: req.body.userId,
			amount,
			username
		});

		if (newWithdrawalRecord && updatedWithdrawalRequest && userBalance) {
			res.status(200).json(newWithdrawalRecord);
		} else {
			res.status(500).send('Internal Server Error');
		}
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
});


router.get('/balance/:id', isUser, async (req, res) => {
	const userId = req.params.id;
	try {
		const userBalance = await balanceModel.findOne({ userId });

		if (!userBalance) {
			return res.status(404).send('User not found');
		}

		res.status(200).json({ balance: userBalance.balance });
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
});
const WithdrawalRequestModel = require('../models/WithdrawalRequest')
// Route for user to send a withdrawal request
router.post("/withdraw-request", isUser, async (req, res) => {
	try {
		const { userId, amount } = req.body;

		// Find the current balance of the user
		const userBalance = await balanceModel.findOne({ userId });

		if (!userBalance || parseFloat(userBalance.balance) < parseFloat(amount)) {
			return res.status(400).send('Insufficient balance');
		}

		// Create a new withdrawal request
		const withdrawalRequest = await WithdrawalRequestModel.create({
			userId,
			amount,
			status: "pending",
			username: req.body.username
		});

		if (withdrawalRequest) {
			res.status(200).json(withdrawalRequest);
		} else {
			res.status(500).send('Internal Server Error');
		}
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
});
router.get("/withdraw-requests", async (req, res) => {
	try {

		const userBalance = await WithdrawalRequestModel.find();

		if (userBalance) {
			res.status(200).json(userBalance);
		} else {
			res.status(500).send('Internal Server Error');
		}
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
});
router.get("/withdraw-requests/:id", async (req, res) => {
	const id = req.params.id
	try {

		const userBalance = await WithdrawalRequestModel.find({ userId: id });

		if (userBalance) {
			res.status(200).json(userBalance);
		} else {
			res.status(500).send('Internal Server Error');
		}
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
});


module.exports = router
