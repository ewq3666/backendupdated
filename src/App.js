import TransactionList from './AddTransactions';
import { BalanceList, WithdrawalList } from './Balance';
import ContestManager from './Contest';
import Dashboard from './Dashboard';
import PaymentManager from './PaymentManager';
import AddQuestion from './Question';
import WithdrawalRequestsTable from './Withdraw';
import logo from './logo.svg';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
      children: [
        {
          path: "contest",
          element: <ContestManager />,
        },
        { path: "payments", element: <PaymentManager /> },
        { path: "balance", element: <BalanceList /> },
        { path: "addtransactions", element: <TransactionList /> },
        { path: "withdrawtransactions", element: <WithdrawalList /> },
        { path: "WithdrawalRequestsTable", element: <WithdrawalRequestsTable /> },
        { path: "addquestions", element: <AddQuestion /> },
      ],
    },
  ]);

  return (
    <div>

      {element}
    </div>
  );
}

export default App;
