import { configureStore } from '@reduxjs/toolkit'
import places from '../state/slice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            places
        },
    })
}