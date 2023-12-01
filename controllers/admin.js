const contest = require("../models/AdminModel")
const asyncHandler = require("express-async-handler");

exports.postContest = asyncHandler(async (req, res) => {
    const result = await contest.create(req.body);
    if (result) {
        res.status(200).json({ message: "contest added" });
    }
    else {
        res.status(500).json({ message: "something went wrong", data: result })
    }
});
exports.getContest = asyncHandler(async (req, res) => {
    const result = await contest.find();
    if (result) {
        res.status(200).json({ result });
    }
    else {
        res.status(500).json({ message: "something went wrong" })
    }
});
const Contest = require('../models/AdminModel');
const Balance = require('../models/BalanceModel');

exports.joinContest = asyncHandler(async (req, res) => {
    const { contestId, userId } = req.params;

    try {
        // Find the contest by its ID
        const foundContest = await Contest.findById(contestId);

        if (foundContest) {
            // Check if the user ID is not already in the users array
            if (!foundContest.users.includes(userId)) {
                // Deduct an amount (assuming the price is deducted upon joining)
                if (foundContest.price) {
                    // Convert the price to a numeric value (you might want to handle validation)
                    const price = parseFloat(foundContest.price);

                    // Update contest price/winning
                    // For example, deducting the contest price from the first winning position
                    if (foundContest.winnings && foundContest.winnings.length > 0) {
                        foundContest.winnings[0] -= price;
                    }

                    // Save the updated contest document
                    await foundContest.save();

                    // Update user's balance
                    const userBalance = await Balance.findOne({ userId });

                    if (userBalance) {
                        // Deduct the price from the user's balance
                        userBalance.balance -= price;
                        await userBalance.save();

                        // Add the user ID to the contest's users array
                        foundContest.users.push(userId);
                        await foundContest.save();

                        // Respond with a success message or updated contest data
                        res.status(200).json({ message: "User joined contest successfully" });
                    } else {
                        res.status(404).json({ message: "User balance not found" });
                    }
                } else {
                    res.status(400).json({ message: "Contest price not specified" });
                }
            } else {
                res.status(400).json({ message: "User already joined this contest", alreadyJoined: true });
            }
        } else {
            res.status(404).json({ message: "Contest not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

exports.getContestsByUserId = async (req, res) => {
    console.log(req.params.userId);
    try {
        // Find contests where the users array contains the specified userId
        const contests = await Contest.find({ users: req.params.userId });

        // Return the contests found
        if (contests.length > 0) {
            res.status(200).json(contests);
        } else {
            res.status(400).json({ message: 'No contests joined yet' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching contests by userId' });
    }
};

exports.getContestId = asyncHandler(async (req, res) => {
    const id = req.params.id
    const result = await contest.findOne({ _id: id });
    if (result) {
        res.status(200).json({ result });
    }
    else {
        res.status(500).json({ message: "something went wrong" })
    }
});
exports.deleteContest = asyncHandler(async (req, res) => {
    const result = await contest.findByIdAndDelete(req.params.id);
    if (result) {
        res.status(200).json({ message: "contest deleted" });
    }
    else {
        res.status(500).json({ message: "something went wrong" })
    }
});
