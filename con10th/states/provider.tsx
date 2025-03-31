"use client"
import {Provider} from "react-redux"
import { AppStore, store } from "./store";
import { useRef} from "react";
import {setupListeners} from "@reduxjs/toolkit/query"

interface Props {
    children: React.ReactNode;
}


export default function CustomProvider({children}: Props) {

    const storeRef = useRef<AppStore | null>(null);

    if (!storeRef.current) {
        storeRef.current = store;
        setupListeners(storeRef.current.dispatch)
    }
    return <Provider store={storeRef.current}>
        {children}
    </Provider>
}