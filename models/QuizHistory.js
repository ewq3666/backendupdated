const mongoose = require('mongoose');

const userQuestionHistorySchema = new mongoose.Schema({
    userId: String,
    seenQuestions: [{
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Quiz'
        }
    }]
});

module.exports = mongoose.model('UserQuestionHistory', userQuestionHistorySchema);
