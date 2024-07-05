import {
  ADD_TRANSACTION,
  UPDATE_ADMIN_FUNDS,
  UPDATE_ADMIN_STOCKS,
} from './actions'

const initialState = {
  transactions: JSON.parse(localStorage.getItem('transactions')) || [],
  adminFunds: 100000,
  adminStocks: JSON.parse(localStorage.getItem('adminStocks')) || {},
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TRANSACTION:
      const newTransactions = [...state.transactions, action.payload]
      localStorage.setItem('transactions', JSON.stringify(newTransactions))
      return {
        ...state,
        transactions: newTransactions,
      }
    case UPDATE_ADMIN_FUNDS:
      const updatedFunds = state.adminFunds + action.payload
      return {
        ...state,
        adminFunds: updatedFunds,
      }
    case UPDATE_ADMIN_STOCKS:
      const newAdminStocks = {
        ...state.adminStocks,
        [action.payload.stock]:
          (state.adminStocks[action.payload.stock] || 0) +
          action.payload.amount,
      }
      localStorage.setItem('adminStocks', JSON.stringify(newAdminStocks))
      return {
        ...state,
        adminStocks: newAdminStocks,
      }
    default:
      return state
  }
}

export default rootReducer
