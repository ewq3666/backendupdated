import React, { useState, useEffect } from 'react';
import { END_POINTS } from './domain';

export const BalanceList = () => {
    const [balances, setBalances] = useState([]);

    useEffect(() => {
        fetch(END_POINTS.balance)
            .then(response => response.json())
            .then(data => setBalances(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="balance-list-container">
            <h1 className="balance-list-header">Balance List</h1>
            <table className="balance-table">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Username</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {balances.length ? balances?.map(balance => (
                        <tr key={balance.userId}>
                            <td>{balance.userId}</td>
                            <td>{balance.username}</td>
                            <td>{balance.balance}</td>
                        </tr>
                    )) : ""}
                </tbody>
            </table>
        </div>
    );
};

export const WithdrawalList = () => {
    const [withdrawals, setWithdrawals] = useState([]);

    useEffect(() => {
        fetch(END_POINTS.withdraw)
            .then(response => response.json())
            .then(data => setWithdrawals(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="withdrawal-list-container">
            <h1 className="withdrawal-list-header">Withdrawal Transactions</h1>
            <table className="withdrawal-table">
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>User ID</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {withdrawals?.length ? withdrawals?.map(withdrawal => (
                        <tr key={withdrawal.transactionId}>
                            <td>{withdrawal.transactionId}</td>
                            <td>{withdrawal.userId}</td>
                            <td>{withdrawal.amount}</td>
                        </tr>
                    )) : ""}
                </tbody>
            </table>
        </div>
    );
};

