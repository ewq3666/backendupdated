import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { END_POINTS } from './domain';
// import './AddQuestionComponent.scss'; // Import your SCSS file

function AddQuestion() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(0);
  const [contests, setContests] = useState([]);
  const [selectedContest, setSelectedContest] = useState('');
  const [contestQuestions, setContestQuestions] = useState([]);

  useEffect(() => {
    // Fetch contests from the server
    async function fetchContests() {
      try {
        const response = await axios.get(END_POINTS.contest);
        setContests(response.data); // Assuming the API returns an array of contests
      } catch (error) {
        console.error(error);
      }
    }

    fetchContests();
  }, []);

  const fetchQuestionsForContest = async (contestId) => {
    try {
      const response = await axios.get(`${END_POINTS.getQuestions}${contestId}`);
      setContestQuestions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOptionChange = (index, e) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
  };

  const handleCorrectOptionChange = (e) => {
    setCorrectOptionIndex(parseInt(e.target.value, 10));
  };

  const handleAddQuestion = async () => {
    try {
      const response = await axios.post(`${END_POINTS.addQuize}${selectedContest}`, {
        quizzes: [{
          question,
          options,
          correctOptionIndex,
        }]
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleContestClick = (contestId) => {
    setSelectedContest(contestId);
    fetchQuestionsForContest(contestId);
  };

  return (
    <div className="questions">
      <br />
      <br />
      <div className="container">
        <h2>Add Question</h2>
        <div>
          <label htmlFor="selectContest" className="label">Select Contest:</label>
          <select id="selectContest" value={selectedContest} onChange={(e) => handleContestClick(e.target.value)} className="select">
            <option value="">Select a contest</option>
            {contests?.result?.length && contests.result?.map((contest) => (
              <option key={contest._id} value={contest._id}>
                {contest.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="questionInput" className="label">Question:</label>
          <input
            id="questionInput"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="input"
          />
        </div>
        <div>
          <label className="label">Options:</label>
          {options.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e)}
                className="input"
              />
            </div>
          ))}
        </div>
        <div>
          <label className="label">Correct Option:</label>
          <select value={correctOptionIndex} onChange={handleCorrectOptionChange} className="select">
            {options.map((option, index) => (
              <option key={index} value={index}>
                Option {index + 1}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleAddQuestion} className="button">Add Question</button>

        {/* Display list of contests */}
        <div>
          <h3 className="listHeader">List of Contests</h3>
          <ul className="list">
            {contests?.result?.map((contest) => (
              <li key={contest._id} onClick={() => handleContestClick(contest._id)} className="listItem">
                {contest.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Display questions for the selected contest */}
        {contestQuestions?.length > 0 && (
          <div>
            <h3 className="listHeader">Questions for Selected Contest</h3>
            <ul className="list">
              {contestQuestions[0].quizzes.map((question, index) => (
                <li key={index} className="listItem">
                  Question: {question.question} <br />
                  Options:
                  <ol>
                    {question.options.map((item, i) => <li key={i}>{item}</li>)}
                  </ol>
                  Correct Option Index: {question.correctOptionIndex}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddQuestion;
