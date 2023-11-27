import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <div className="dashboard">
            <Link to="/contest">Contest</Link>
            <Link to="/payments">Payments</Link>
            <Link to="/balance">balance</Link>
            <Link to="/addtransactions">addmoney transactions</Link>
            <Link to="/withdrawtransactions">withdraw transactions</Link>
            <Link to="/WithdrawalRequestsTable">Withdrawal Requests</Link>
            <Link to="/addquestions">Add Questions</Link>
            <Link to="/">Home </Link>
            </div>
            <Outlet/>
        </div>
    )
}

export default Dashboard;
