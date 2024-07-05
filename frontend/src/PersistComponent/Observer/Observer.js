import React from 'react'
import { useSelector } from 'react-redux'
import './Observer.css'
import Trading_Image from '../Utility/Trading_Image.png'

function Observer() {
  const transactions = useSelector((state) => state.transactions)
  const stocks = useSelector((state) => state.stocks)
  const [selectedStock, setSelectedStock] = React.useState(
    Object.keys(stocks)[0] || ''
  )

  return (
    <div className="observer-page">
      <div className="observer-content">
        <img className="observer-image" src={Trading_Image} alt="Observer" />
        <div className="stock-box">
          <select
            onChange={(e) => setSelectedStock(e.target.value)}
            value={selectedStock}
          >
            {Object.keys(stocks).map((stock) => (
              <option key={stock} value={stock}>
                {stock}
              </option>
            ))}
          </select>
          <div className="stock-actions">
            <input
              type="number"
              className="stock-quantity"
              placeholder="Quantity"
            />
            <button className="sell-button">Sell</button>
            <p className="total-price">Total Price: $0.00</p>
          </div>
        </div>
      </div>
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

export default Observer
