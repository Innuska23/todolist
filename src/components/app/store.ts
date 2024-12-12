import { UnknownAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { configureStore } from "@reduxjs/toolkit"

import { appReducer, appSlice } from "./appSlice"
import { todoListReducer, todoListSlice } from "../features/todolists/model/todolistsSlice"
import { tasksReducer, tasksSlice } from "components/features/todolists/model/tasksSlice"
import { setupListeners } from "@reduxjs/toolkit/query"
import { baseApi } from "components/features/todolists/api/baseApi"

export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todoListSlice.name]: todoListReducer,
    [appSlice.name]: appReducer,
    [baseApi.reducerPath]: baseApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})



setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>