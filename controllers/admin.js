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
exports.deleteContest = asyncHandler(async (req, res) => {
    const result = await contest.findByIdAndDelete(req.params.id);
    if (result) {
        res.status(200).json({ message: "contest deleted" });
    }
    else {
        res.status(500).json({ message: "something went wrong"})
    }
});