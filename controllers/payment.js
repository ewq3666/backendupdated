const paymentModel = require("../models/AddPaymentModel");

const router = require("express").Router();

router.post('/addmoney', async (req, res) => {
	try {
		const { userId } = req.body;

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

router.post('/withdrawal', async (req, res) => {
	try {
		const { userId, withdrawalAmount } = req.body;

		// Create a new withdrawal request
		const newWithdrawalRequest = await paymentModel.create({
			userId,
			withdrawalAmount,
			isWithdrawalRequest: true,
			isAproved: false
		});

		if (newWithdrawalRequest) {
			res.status(200).send('Withdrawal request created successfully');
		} else {
			res.status(500).send('Internal Server Error');
		}
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
});
router.get('/admin/withdrawal-requests', async (req, res) => {
	try {
		// Find all withdrawal requests where isApproved is false
		const withdrawalRequests = await paymentModel.find({ isAproved: false });
		if (withdrawalRequests) {
			res.status(200).json(withdrawalRequests);
		}
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
});

module.exports = router
