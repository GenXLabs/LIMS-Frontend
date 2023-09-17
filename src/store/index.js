// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import calendar from 'src/store/apps/calendar'

export const store = configureStore({
  reducer: {
    calendar
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
