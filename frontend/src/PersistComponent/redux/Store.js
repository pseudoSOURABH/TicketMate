import { configureStore, createSlice } from '@reduxjs/toolkit'

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (err) {
    // Ignore write errors
  }
}

const initialState = loadState() || {
  users: [
    { id: 1, name: 'User1', balance: 100000, tokens: {}, stocks: {} },
    { id: 2, name: 'User2', balance: 100000, tokens: {}, stocks: {} },
    { id: 3, name: 'User3', balance: 100000, tokens: {}, stocks: {} },
    { id: 4, name: 'User4', balance: 100000, tokens: {}, stocks: {} },
  ],
  transactions: [],
  stocks: {},
}

// Create slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    buyToken: (state, action) => {
      const { userId, stock, amount } = action.payload
      const user = state.users.find((user) => user.id === userId)
      if (user && user.balance >= amount) {
        user.balance -= amount
        if (!user.tokens[stock]) {
          user.tokens[stock] = 0
        }
        user.tokens[stock] += amount
        state.transactions.push({
          userId,
          type: 'Buy Token',
          stock,
          amount,
          timestamp: new Date().toISOString(),
        })

        // Automatically buy stocks
        if (!state.stocks[stock]) {
          state.stocks[stock] = 0
        }
        state.stocks[stock] += amount
        alert(
          'Your stock has automatically bought as a user bought the token for that stock.'
        )
      }
    },
    buyStockWithToken: (state, action) => {
      const { userId, stock, amount } = action.payload
      const user = state.users.find((user) => user.id === userId)
      if (user && user.tokens[stock] >= amount) {
        user.tokens[stock] -= amount
        if (!user.stocks[stock]) {
          user.stocks[stock] = 0
        }
        user.stocks[stock] += amount
        state.transactions.push({
          userId,
          type: 'Buy Stock',
          stock,
          amount,
          timestamp: new Date().toISOString(),
        })

        // Automatically sell stocks
        if (state.stocks[stock] >= amount) {
          state.stocks[stock] -= amount
          user.balance += amount
          state.transactions.push({
            userId,
            type: 'Sell Stock',
            stock,
            amount,
            timestamp: new Date().toISOString(),
          })
          alert(
            'Your stock has automatically sold as the same user bought the stock.'
          )
        }
      }
    },
    sellStock: (state, action) => {
      const { stock, amount } = action.payload
      if (state.stocks[stock] >= amount) {
        state.stocks[stock] -= amount
        state.transactions.push({
          type: 'Sell Stock',
          stock,
          amount,
          timestamp: new Date().toISOString(),
        })
      }
    },
  },
})

export const { buyToken, buyStockWithToken, sellStock } = userSlice.actions

const store = configureStore({
  reducer: userSlice.reducer,
  preloadedState: loadState(),
})

store.subscribe(() => {
  saveState(store.getState())
})

export { store }
