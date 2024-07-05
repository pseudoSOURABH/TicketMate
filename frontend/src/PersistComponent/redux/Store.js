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
    console.error('Failed to load state from localStorage:', err)
    return undefined
  }
}

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (err) {
    console.error('Failed to save state to localStorage:', err)
  }
}

// Default state
const getDefaultState = () => ({
  users: [
    { id: 1, name: 'User1', balance: 100000, tokens: {}, stocks: {} },
    { id: 2, name: 'User2', balance: 100000, tokens: {}, stocks: {} },
    { id: 3, name: 'User3', balance: 100000, tokens: {}, stocks: {} },
    { id: 4, name: 'User4', balance: 100000, tokens: {}, stocks: {} },
    { id: 5, name: 'User5', balance: 100000, tokens: {}, stocks: {} },
  ],
  transactions: [], // Ensure transactions is an array
  adminTransactions: [], // Ensure adminTransactions is an array
  stocks: {},
  AdminFunds: 1000000, // Initialize AdminFunds with $1,000,000
  stockPrices: { // Add stock prices
    'Apple': 150,
    'Google': 2800,
    'Amazon': 3400,
    'Bitcoin': 299,
    'Tesla': 700,
    'Salenium': 360,
    'Eitherium': 590,
    'Dogcoin': 220,
    'Reliance': 175,
    'NASDAQ': 230,
  }
})

// Ensure the loaded state has all required properties
const ensureStateStructure = (state) => {
  if (!state) return getDefaultState()
  return {
    users: state.users || [
      { id: 1, name: 'User1', balance: 100000, tokens: {}, stocks: {} },
      { id: 2, name: 'User2', balance: 100000, tokens: {}, stocks: {} },
      { id: 3, name: 'User3', balance: 100000, tokens: {}, stocks: {} },
      { id: 4, name: 'User4', balance: 100000, tokens: {}, stocks: {} },
      { id: 5, name: 'User5', balance: 100000, tokens: {}, stocks: {} },
    ],
    transactions: state.transactions || [],
    adminTransactions: state.adminTransactions || [],
    stocks: state.stocks || {},
    AdminFunds: state.AdminFunds !== undefined ? state.AdminFunds : 1000000, // Ensure AdminFunds is loaded or set to default
    stockPrices: state.stockPrices || {
      // Ensure stockPrices is loaded or set to default
     'Apple': 150,
    'Google': 2800,
    'Amazon': 3400,
    'Bitcoin': 299,
    'Tesla': 700,
    'Salenium': 360,
    'Eitherium': 590,
    'Dogcoin': 220,
    'Reliance': 175,
    'NASDAQ': 230,
    },
  }
}

const initialState = ensureStateStructure(loadState())

// Create slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    buyToken: (state, action) => {
      const { userId, stock, amount } = action.payload
      const user = state.users.find((user) => user.id === userId)
      const stockPrice = state.stockPrices[stock] || 0
      const totalCost = amount * stockPrice

      if (user && user.balance >= totalCost) {
        user.balance -= totalCost
        user.tokens[stock] = (user.tokens[stock] || 0) + amount

        state.transactions.push({
          userId,
          type: 'Buy Token',
          stock,
          amount,
          timestamp: new Date().toISOString(),
        })

        // Automatically buy stocks for the admin
        state.stocks[stock] = (state.stocks[stock] || 0) + amount
        state.adminTransactions.push({
          type: 'Admin Buy Stock',
          stock,
          amount,
          timestamp: new Date().toISOString(),
        })

        // Deduct the equivalent money of stock from AdminFunds
        state.AdminFunds -= totalCost
      }
    },
    buyStockWithToken: (state, action) => {
      const { userId, stock, amount } = action.payload
      const user = state.users.find((user) => user.id === userId)
      const stockPrice = state.stockPrices[stock] || 0
      const totalValue = amount * stockPrice

      if (user && user.tokens[stock] >= amount) {
        user.tokens[stock] -= amount
        user.stocks[stock] = (user.stocks[stock] || 0) + amount

        state.transactions.push({
          userId,
          type: 'Buy Stock',
          stock,
          amount,
          timestamp: new Date().toISOString(),
        })

        // Automatically sell stocks for the admin
        if (state.stocks[stock] >= amount) {
          state.stocks[stock] -= amount
          state.adminTransactions.push({
            userId: 'admin', // Assuming admin has a unique ID or placeholder
            type: 'Admin Sell Stock',
            stock,
            amount,
            timestamp: new Date().toISOString(),
          })

          // Add the equivalent money of stock to AdminFunds
          state.AdminFunds += totalValue
        }
      }
    },
    adminSellStock: (state, action) => {
      const { stock, amount } = action.payload
      const stockPrice = state.stockPrices[stock] || 0
      const totalValue = amount * stockPrice

      if (state.stocks[stock] >= amount) {
        state.stocks[stock] -= amount
        state.adminTransactions.push({
          userId: 'admin', // Assuming admin has a unique ID or placeholder
          type: 'Time Out:Auto Sell',
          stock,
          amount,
          timestamp: new Date().toISOString(),
        })

        // Add the equivalent money of stock to AdminFunds
        state.AdminFunds += totalValue
      }
    }
  },
})

export const { buyToken, buyStockWithToken, adminSellStock } = userSlice.actions

// Middleware to handle delayed actions
const timedActionMiddleware = store => next => action => {
  if (action.type === 'users/buyToken') {
    const { userId, stock, amount } = action.payload

    // Set a timeout for 5 minutes (300000 ms)
    setTimeout(() => {
      const state = store.getState()
      const user = state.users.find(user => user.id === userId)

      // Check if the user hasn't bought the stock with the token
      if (user && user.tokens[stock] >= amount) {
        store.dispatch(adminSellStock({ stock, amount }))
      }
    }, 300000)
  }

  return next(action)
}

const store = configureStore({
  reducer: userSlice.reducer,
  preloadedState: initialState,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(timedActionMiddleware)
})

store.subscribe(() => {
  saveState(store.getState())
})

export { store }
