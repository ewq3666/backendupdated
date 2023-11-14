const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    question: String,
    options: [String],
    correctOptionIndex: Number,
    contestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contest' // Reference to the Contest model
    }
});

module.exports = mongoose.model('Quiz', quizSchema);
