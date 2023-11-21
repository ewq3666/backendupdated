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

exports.joinContest = asyncHandler(async (req, res) => {
    const { contestId, userId } = req.params;

    try {
        // Find the contest by its ID
        const foundContest = await contest.findById(contestId);

        if (foundContest) {
            // Check if the user ID is not already in the users array
            if (!foundContest.users.includes(userId)) {
                // Add the user ID to the users array
                foundContest.users.push(userId);

                // Save the updated contest document
                await foundContest.save();

                // Respond with a success message or updated contest data
                res.status(200).json({ message: "User joined contest successfully", contest: foundContest });
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