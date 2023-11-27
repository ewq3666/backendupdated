import React, { useState, useEffect } from 'react';
import { END_POINTS } from './domain';

const PaymentManager = () => {
  const [withdrawalRequests, setWithdrawalRequests] = useState([]);

  useEffect(() => {
    fetch(END_POINTS.withdrawRequests)
      .then(response => response.json())
      .then(data => setWithdrawalRequests(data))
      .catch(error => console.error(error));
  }, []);

  const handleProcessWithdrawal = (id) => {
    setWithdrawalRequests(withdrawalRequests.filter(request => request.id !== id));
  };

  return (
    <div className="payment-manager">
      <h2>Withdrawal Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {withdrawalRequests.length && withdrawalRequests.map(request => (
            <tr key={request.id}>
              {console.log(request)}
              <td>{request.userId}</td>
              <td>${request.withdrawalAmount}</td>
              <td>
                <button onClick={() => handleProcessWithdrawal(request.id)}>
                  Process Payment
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentManager;
