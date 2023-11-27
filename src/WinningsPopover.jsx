import React from 'react';

const WinningsPopover = ({ winningsData, onClose, settotalWinning, showBtn }) => {
  const deleteWinnings = (index) => {
    console.log(winningsData.winnings, index);
    settotalWinning(winningsData?.winnings?.filter((item, inx) => inx !== index), index)
  }
  return (
    <div className="popover">
      <div className="popover-content">
        {/* <button onClick={onClose} type='button'>Close</button> */}
        <table>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Amount</th>
              {
                showBtn &&
                <th>Action</th>
              }
            </tr>
          </thead>
          <tbody>
            {winningsData?.map((item, index) => (
              <tr key={index}>
                <td>{item.from}</td>
                <td>{item.to}</td>
                <td>{item.amount}</td>
                {showBtn && <td><button type='button' onClick={() => deleteWinnings(index)}>Delete</button></td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WinningsPopover;
export const UsersTable = ({ winningsData, onClose, settotalWinning, showBtn }) => {
  const deleteWinnings = (index) => {
    console.log(winningsData.winnings, index);
    settotalWinning(winningsData?.winnings?.filter((item, inx) => inx !== index), index)
  }
  return (
    <div className="popover">
      <div className="popover-content">
        {/* <button onClick={onClose} type='button'>Close</button> */}
        <table>
          <thead>
            <tr>
              <th>Users</th>
          
            </tr>
          </thead>
          <tbody>
            {winningsData?.map((item, index) => (
              <tr key={index}>
                <td>{item}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

