import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { buyToken, buyStockWithToken } from './/redux/Store'
import './Users.css'

function Users() {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  const [selectedUser, setSelectedUser] = React.useState(users[0].id)
  const [selectedStock, setSelectedStock] = React.useState('Stock1')
  const [tokenAmount, setTokenAmount] = React.useState(0)
  const [stockAmount, setStockAmount] = React.useState(0)

  const handleBuyToken = () => {
    dispatch(
      buyToken({
        userId: selectedUser,
        stock: selectedStock,
        amount: Number(tokenAmount),
      })
    )
  }

  const handleBuyStockWithToken = () => {
    dispatch(
      buyStockWithToken({
        userId: selectedUser,
        stock: selectedStock,
        amount: Number(stockAmount),
      })
    )
  }

  return (
    <div className="users-page">
      {users.map((user) => (
        <div key={user.id} className="user-box">
          <h2>{user.name}</h2>
          <div className="buy-token-section">
            <select onChange={(e) => setSelectedStock(e.target.value)}>
              {[
                'Apple',
                'Tesla',
                'Bitcoin',
                'Salenium',
                'Reliance',
                'Google',
                'NASDAQ',
                'Amazon',
                'Dogcoin',
                'Either',
              ].map((stock) => (
                <option key={stock} value={stock}>
                  {stock}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Token Amount"
              value={tokenAmount}
              onChange={(e) => setTokenAmount(e.target.value)}
            />
            <button onClick={handleBuyToken}>Buy Token</button>
          </div>
          <div className="buy-stock-section">
            <select onChange={(e) => setSelectedStock(e.target.value)}>
              {[
                'Apple',
                'Tesla',
                'Bitcoin',
                'Salenium',
                'Reliance',
                'Google',
                'NASDAQ',
                'Amazon',
                'Dogcoin',
                'Either',
              ].map((stock) => (
                <option key={stock} value={stock}>
                  {stock}
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
              Buy Stock with Token
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Users
