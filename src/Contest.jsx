import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { END_POINTS } from './domain';
import WinningsPopover, { UsersTable } from './WinningsPopover';
import { Modal, notification } from "antd"

const ContestManager = () => {
  const [contests, setContests] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setloading] = useState(true)
  const [winnings, setwinnings] = useState({ from: 0, to: 0, amount: 0 })
  const [totalWinning, settotalWinning] = useState([])
  const [showPopover, setShowPopover] = useState(false); // State to control popover visibility
  const [popoverData, setPopoverData] = useState([]); // State to store popover data
  const [contestId, setcontestId] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    // Fetch contests from the API
    axios.get(END_POINTS.contest)
      .then(response => setContests(response.data.result))
      .catch(error => console.error(error));
  }, []);

  const winningAdd = (e) => {
    const { name, value } = e.target
    setwinnings((prev) => ({ ...prev, [name]: value }))
    console.log(e.target.name);
  }
  const addContest = async (e) => {
    e.preventDefault();

    // Send a POST request to add a new contest

    await axios.post(END_POINTS.contest, { name, price, date, time, winnings: totalWinning })
      .then(response => {
        setContests([...contests, response.data]);
        setName('');
        setPrice('');
        setDate('');
        setTime('');
      })
      .catch(error => notification.error({ message: 'something went wrong' }));
  };

  const handleWinningsClick = (winnings, id) => {
    setPopoverData(winnings); // Set popover data
    setShowPopover(true); // Show popover
    setcontestId(id)
    showModal()
  };

  const handleClosePopover = () => {
    setShowPopover(false); // Hide popover
  };

  const addWinning = () => {
    settotalWinning([...totalWinning, winnings])
    console.log(totalWinning);
  }
  const deleteContest = (id) => {
    console.log(id);
    // Send a DELETE request to remove a contest
    axios.delete(`${END_POINTS.contest}/${id}`)
      .then(response => {
        const updatedContests = contests.filter(contest => contest._id !== id);
        setContests(updatedContests);
      })
      .catch(error => console.error(error));
  };

  const usersJoined=(users,id)=>{

  }
  return (
    <div className="contest-manager">
      <form onSubmit={addContest}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Price:</label>
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label>Time:</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
        <div >
          <br />
          <label>Winnings:</label>
          <br />
          <div style={{ display: 'flex' }}>

            <label>from:</label>
            <input type="number" placeholder='from' value={winnings.from} name='from' onChange={(e) => winningAdd(e)} />
            <br />
            <label>to:</label>
            <br />
            <input type="number" placeholder='to' value={winnings.to} name='to' onChange={(e) => winningAdd(e)} />
            <br />
            <br />
            <label>amount:</label>
            <input type="number" placeholder='amount' value={winnings.amount} name='amount' onChange={(e) => winningAdd(e)} />
            <button onClick={addWinning} type='button'>Add Winning</button>
          </div>
          <WinningsPopover
            winningsData={totalWinning}
            settotalWinning={settotalWinning}
            totalWinning={totalWinning}
          />
        </div>
        <button type="submit">Add Contest</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Date</th>
            <th>Time</th>
            <th>Action</th>
            <th>Details</th>
          
          </tr>
        </thead>
        <tbody>
          {
            contests?.length ?
              contests?.map((contest) => (
                <tr key={contest._id}>
                  <td>{contest.name}</td>
                  <td>{contest.price}</td>
                  <td>{contest.date}</td>
                  <td>{contest.time}</td>
                  <td>
                    <button onClick={() => deleteContest(contest._id)}>Delete</button>
                  </td>
                  <td>
                    <button onClick={() => handleWinningsClick(contest.winnings, contest._id)}>Details</button>
                  </td>
                
                </tr>
              )) : ""}
        </tbody>
      </table>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <WinningsPopover
          winningsData={contests.find((item)=>item._id == contestId)?.winnings}
          onClose={handleClosePopover}
          showBtn={false}
        />
        <br />
        <UsersTable
          winningsData={contests.find((item)=>item._id == contestId)?.users}
          onClose={handleClosePopover}
          showBtn={false}
        />
      </Modal>
    </div>
  );
};

export default ContestManager;
