const { isUser } = require("../middleware/authProtected");
const paymentModel = require("../models/AddPaymentModel");

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
router.post('/addmoney', async (req, res) => {
	try {
		// Create a new payment record
		const newPaymentRecord = await paymentModel.create(req.body);

		if (newPaymentRecord) {
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
router.post("/balance/:id", isUser, async (req, res) => {
	const userId = req.params.id
	try {
		const user = await userBalance.findOneAndUpdate({ userId }, req.body);
		console.log(user);
		if (user) {
			res.status(200).json(user);
		}
	} catch (error) {
		const { balance, username, userId } = req.body
		try {
			const user = await userBalance.create({ balance, username, userId });
			if (user) {
				res.status(200).json(user);
			}
		} catch (error) {
			console.error(error, "here is user");
			res.status(500).send('Internal Server Error');
		}

	}
})

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
router.post("/withdraw/:id", isUser, async (req, res) => {
	const userId = req.params.id
	try {
		const user = await WithdrawModel.findOneAndUpdate({ userId }, req.body);
		console.log(user);
		if (user) {
			res.status(200).json(user);
		}
	} catch (error) {
		const { balance, username, userId } = req.body
		try {
			const user = await WithdrawModel.create({ balance, username, userId });
			if (user) {
				res.status(200).json(user);
			}
		} catch (error) {
			console.error(error, "here is user");
			res.status(500).send('Internal Server Error');
		}

	}
})

module.exports = router
