export const ADD_TRANSACTION = 'ADD_TRANSACTION'
export const UPDATE_ADMIN_FUNDS = 'UPDATE_ADMIN_FUNDS'
export const UPDATE_ADMIN_STOCKS = 'UPDATE_ADMIN_STOCKS'

export const addTransaction = (transaction) => ({
  type: ADD_TRANSACTION,
  payload: transaction,
})

export const updateAdminFunds = (amount) => ({
  type: UPDATE_ADMIN_FUNDS,
  payload: amount,
})

export const updateAdminStocks = (stock) => ({
  type: UPDATE_ADMIN_STOCKS,
  payload: stock,
})
