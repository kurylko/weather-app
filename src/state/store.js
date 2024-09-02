import { configureStore } from '@reduxjs/toolkit'

import searchPlaceSlice from './searchPlaceSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      searchPlaceSlice,
    },
  })
}
