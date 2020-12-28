import { configureStore } from "@reduxjs/toolkit";

import { filterReducer } from "./features/filter";

export const store = configureStore({
    reducer: {
        filter: filterReducer
    },
    devTools: process.env.NODE_ENV !== "development" ? false : true
})

export type RootState = ReturnType<typeof store.getState>;