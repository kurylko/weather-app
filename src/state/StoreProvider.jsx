'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import {makeStore} from "@/state/store";

export default function StoreProvider({ children }) {
    const storeRef = useRef(null)
    if (!storeRef.current) {
        storeRef.current = makeStore()
    } else {
        console.warn(storeRef.current.getState())
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}