import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './Account.css'

function Account() {
  const transactions = useSelector((state) => state.transactions)
  const adminTransactions = useSelector((state) => state.adminTransactions)
  const adminFunds = useSelector((state) => state.AdminFunds) || 1000000
  const stockPrices = useSelector((state) => state.stockPrices)

  const [adminHoldings, setAdminHoldings] = useState([])
  const [tokenTransactions, setTokenTransactions] = useState([])
  const [stockworth, setStockworth] = useState({})

  useEffect(() => {
    const filteredTokenTransactions = transactions.filter(
      (tx) => tx.type === 'Buy Token'
    )
    setTokenTransactions(filteredTokenTransactions)
  }, [transactions])

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

  useEffect(() => {
    const holdings = []

    adminTransactions.forEach((tx) => {
      if (tx.type === 'Admin Buy Stock') {
        const existingHolding = holdings.find(
          (holding) => holding.stock === tx.stock
        )
        if (existingHolding) {
          existingHolding.quantity += tx.amount
        } else {
          holdings.push({
            stock: tx.stock,
            quantity: tx.amount,
          })
        }
      } else if (tx.type === 'Admin Sell Stock') {
        const holdingIndex = holdings.findIndex(
          (holding) => holding.stock === tx.stock
        )
        if (holdingIndex !== -1) {
          holdings[holdingIndex].quantity -= tx.amount
          if (holdings[holdingIndex].quantity <= 0) {
            holdings.splice(holdingIndex, 1)
          }
        }
      }
    })

    setAdminHoldings(holdings)

    const newStockworth = {}
    holdings.forEach(({ stock, quantity }) => {
      if (stockPrices[stock] !== undefined) {
        newStockworth[stock] = stockPrices[stock] * quantity
      } else {
        console.warn(`Price for stock '${stock}' is not available`)
      }
    })

    setStockworth(newStockworth)
  }, [adminTransactions, stockPrices])

  useEffect(() => {
    console.log('Admin Holdings:', adminHoldings)
    console.log('Stock Worth:', stockworth)
  }, [adminHoldings, stockworth])

  return (
    <div className="account-page">
      <h1 className="account-heading">Account Section</h1>
      <h1 className="account-tagline">Admin Holdings</h1>

      <div className="admin-section">
        <div className="funds-table">
          <table>
            <thead>
              <tr>
                <th colSpan="2">Funds Info</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Balance</td>
                <td>{adminFunds} $</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="holdings-table">
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Quantity</th>
                <th>Worth</th>
              </tr>
            </thead>
            <tbody>
              {adminHoldings.map((holding, index) => (
                <tr key={index}>
                  <td>{holding.stock}</td>
                  <td>{holding.quantity}</td>
                  <td>{stockworth[holding.stock]} $</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="transactions-section">
        <h2 className="transactions-heading">Solana Transactions</h2>
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
              {tokenTransactions.map((tx, index) => (
                <tr key={index}>
                  <td>{tx.userId}</td>
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

export default Account
