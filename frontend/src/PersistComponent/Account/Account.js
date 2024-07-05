import React from 'react'
import { useSelector } from 'react-redux'
import './Account.css'

function Account() {
  const transactions = useSelector((state) => state.transactions)
  const users = useSelector((state) => state.users)
  const [selectedUser, setSelectedUser] = React.useState(users[0].id)

  return (
    <div className="account-page">
      <h1 className="account-heading">Account Heading</h1>
      <p className="account-tagline">Your random tagline here</p>
      <div className="info-boxes">
        <div className="info-box">
          <div className="info-row">
            Total Balance:{' '}
            <span className="balance-value">
              {users.find((user) => user.id === selectedUser).balance}
            </span>
          </div>
          <div className="info-row">
            Total Tokens:{' '}
            <span className="token-value">
              {JSON.stringify(
                users.find((user) => user.id === selectedUser).tokens
              )}
            </span>
          </div>
          <div className="info-row">
            <select onChange={(e) => setSelectedUser(Number(e.target.value))}>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <nav className="navigation-bar">
        <a href="#">Transactions</a>
      </nav>
      <div className="transactions-table">
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Type</th>
              <th>Stock</th>
              <th>Amount</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index}>
                <td>{tx.userId}</td>
                <td>{tx.type}</td>
                <td>{tx.stock}</td>
                <td>{tx.amount}</td>
                <td>{tx.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Account
