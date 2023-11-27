import React, { useState, useEffect } from 'react';
import { END_POINTS } from './domain';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch(END_POINTS.addmoney)
      .then(response => response.json())
      .then(data => setTransactions(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  console.log(transactions);
  return (
    <div className="transaction-list-container">
      <h1 className="transaction-list-header">Add Money Transactions</h1>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>User Email</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.length ? transactions?.map(transaction => (
            <tr key={transaction.orderId}>
              <td>{transaction.orderId}</td>
              <td>{transaction.userId}</td>
              <td>{transaction.user_email}</td>
              <td>{transaction.amount}</td>
            </tr>
          )):""}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
