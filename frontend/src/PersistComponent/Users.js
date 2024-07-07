import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { buyToken, buyStockWithToken } from './redux/Store'
import './Users.css'

function Users() {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  const stockPrices = useSelector((state) => state.stockPrices)
  const [selectedStock, setSelectedStock] = useState('Apple')
  const [tokenAmount, setTokenAmount] = useState(0)
  const [stockAmount, setStockAmount] = useState(0)
  const [popupMessage, setPopupMessage] = useState('')
  const [showPopup, setShowPopup] = useState(false)

  const user = users[0]

  const handleBuyToken = () => {
    if (user && user.balance >= tokenAmount) {
      dispatch(
        buyToken({
          userId: user.id,
          stock: selectedStock,
          amount: Number(tokenAmount),
        })
      )
      setTokenAmount(0)
      if (selectedStock === 'Hero') {
        setPopupMessage(
          `Admin Bought: ${tokenAmount} Hero Token<br/>User Bought: ${tokenAmount} Hero Solana`
        )
      } else {
        setPopupMessage(`User Bought: ${tokenAmount} ${selectedStock} Solana`)
      }
      setShowPopup(true)
      setTimeout(() => setShowPopup(false), 3000)
    } else {
      alert('Insufficient balance to buy tokens.')
    }
  }

  const handleBuyStockWithToken = () => {
    if (user) {
      const tokenBalance = user.tokens[selectedStock] || 0
      if (tokenBalance >= stockAmount) {
        dispatch(
          buyStockWithToken({
            userId: user.id,
            stock: selectedStock,
            amount: Number(stockAmount),
          })
        )
        setStockAmount(0)
        if (selectedStock === 'Hero') {
          setPopupMessage(
            `Admin Sold: ${stockAmount} Hero Token<br/>User Bought: ${stockAmount} Hero Token`
          )
        } else {
          setPopupMessage(`User Bought: ${stockAmount} ${selectedStock} Solana`)
        }
        setShowPopup(true)
        setTimeout(() => setShowPopup(false), 3000)
      } else {
        alert('Insufficient tokens to buy stock.')
      }
    }
  }

  return (
    <div className="users-page">
      {user && (
        <div className="user-box">
          <h2>{user.name}</h2>
          <p>Remaining Balance: {user.balance}</p>
          <div className="card-row">
            <div className="card">
              <h3>Solana Holdings</h3>
              <table>
                <thead>
                  <tr>
                    <th>Solana</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(user.tokens).map(([token, quantity]) => (
                    <tr key={token}>
                      <td>{token}</td>
                      <td>{quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card">
              <h3>Stock Holdings</h3>
              <table>
                <thead>
                  <tr>
                    <th>Stock</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(user.stocks).map(([stock, quantity]) => (
                    <tr key={stock}>
                      <td>{stock}</td>
                      <td>{quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card">
              <div className="buy-token-section">
                <h3>Buy Solana</h3>
                <select onChange={(e) => setSelectedStock(e.target.value)}>
                  {Object.keys(stockPrices).map((stock) => (
                    <option key={stock} value={stock}>
                      {stock} - ${stockPrices[stock]}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Token Amount"
                  value={tokenAmount}
                  onChange={(e) => setTokenAmount(e.target.value)}
                />
                <button onClick={handleBuyToken}>Buy Solana</button>
              </div>
              <div className="buy-stock-section">
                <h3>Buy Stocks</h3>
                <select onChange={(e) => setSelectedStock(e.target.value)}>
                  {Object.keys(stockPrices).map((stock) => (
                    <option key={stock} value={stock}>
                      {stock} - ${stockPrices[stock]}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Stock Amount"
                  value={stockAmount}
                  onChange={(e) => setStockAmount(e.target.value)}
                />
                <button onClick={handleBuyStockWithToken}>
                  Buy Token with Solana
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showPopup && (
        <div
          className="popup"
          dangerouslySetInnerHTML={{ __html: popupMessage }}
        />
      )}
    </div>
  )
}

export default Users
