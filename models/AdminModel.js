const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    question: String,
    options: [String],
    correctOptionIndex: Number
});

const contestSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        price: String,
        winnings: Array,
        date: Date,
        time: String,
        quizzes: Array,
        users: Array
    },
    { timestamps: true }
);

module.exports = mongoose.model('Contest', contestSchema);
