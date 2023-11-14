const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    question: String,
    options: [String],
    correctOptionIndex: Number
});

const contestSchema = mongoose.Schema(
    {
        name: String,
        price: String,
        leaderboard: Array,
        date: Date,
        time: String,
        quizzes: [quizSchema] // Reference to the quizSchema as an array within contestSchema
    },
    { timestamps: true }
);

module.exports = mongoose.model('Contest', contestSchema);
