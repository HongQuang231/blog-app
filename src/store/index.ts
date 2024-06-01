import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './slices/loginSlices'

export const store = configureStore({
  reducer: {
    login: loginReducer
  },
})