import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { END_POINTS } from './domain';

function WithdrawalRequestsTable() {
    const [requests, setRequests] = useState([]);
    const [balances, setBalances] = useState({});

    useEffect(() => {
        // Fetch withdrawal requests from API
        axios.get(END_POINTS.withdrawRequests)
            .then(response => setRequests(response.data))
            .catch(error => console.error('Error fetching withdrawal requests:', error));

        // Fetch balances from API
        axios.get(END_POINTS.balance)
            .then(response => setBalances(response.data))
            .catch(error => console.error('Error fetching balances:', error));
    }, []);

    const handleApprove = (requestId) => {
        // Find the request with the matching _id
        const selectedRequest = requests.find(request => request._id === requestId);

        if (selectedRequest) {
            // Send request to API to approve withdrawal
            axios.post(`${END_POINTS.withdraw}/${requestId}`, {
                amount: selectedRequest.amount,
                userId: selectedRequest.userId
            })
                .catch(error => console.error('Error approving withdrawal:', error));
        }
    };

    return (
        <div className="withdrawal-table">
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Balance</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {requests?.length ? requests?.map(request => (
                        <tr key={request._id}>
                            <td>{request.userId}</td>
                            <td>${request.amount}</td>
                            <td>{request.status}</td>
                            <td>${balances?.length && balances?.find((item) => item.userId === request.userId).balance}</td>
                            <td>
                                {request.status === 'pending' && (
                                    <button onClick={() => handleApprove(request._id)}>Approve</button>
                                )}
                            </td>
                        </tr>
                    )):"loading"}
                </tbody>
            </table>
        </div>
    );
}

export default WithdrawalRequestsTable;
