import React from 'react'
import { useSelector } from 'react-redux'
import './Observer.css'
import Trading_Image from '../Utility/Trading_Image.png'

function Observer() {
  const transactions = useSelector((state) => state.transactions)
  const adminTransactions = useSelector((state) => state.adminTransactions)
  const stocks = useSelector((state) => state.stocks)
  const [selectedStock, setSelectedStock] = React.useState(
    Object.keys(stocks)[0] || ''
  )

  const allTransactions = [...transactions, ...adminTransactions].sort(
    (a, b) => {
      const dateA = new Date(a.timestamp)
      const dateB = new Date(b.timestamp)

      if (dateA.getTime() === dateB.getTime()) {
        if (a.userId === 'User1' && b.userId !== 'User1') return -1
        if (a.userId !== 'User1' && b.userId === 'User1') return 1
      }

      return dateB - dateA
    }
  )

  const formatTimestamp = (timestamp) => {
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Asia/Kolkata',
    }).format(new Date(timestamp))
  }

  return (
    <div className="observer-page">
      <div className="observer-content">
        <img className="observer-image" src={Trading_Image} alt="Observer" />

        <div className="transactions-table">
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Type</th>
                <th>Company</th>
                <th>Quantity</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {allTransactions.map((tx, index) => (
                <tr key={index}>
                  <td>{tx.type === 'Admin Buy Stock' ? 'Admin' : tx.userId}</td>
                  <td>{tx.type}</td>
                  <td>{tx.stock}</td>
                  <td>{tx.amount}</td>
                  <td>{formatTimestamp(tx.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Observer
