import { applyMiddleware, combineReducers, legacy_createStore, UnknownAction } from 'redux'

import { appReducer } from './app-reducer'
import { tasksReducer } from '../features/todolists/model/tasks-reducer'
import { todoListReducer } from '../features/todolists/model/todolists-reducer'
import { thunk, ThunkDispatch } from 'redux-thunk'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListReducer,

    app: appReducer
})

export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>

// @ts-ignore
window.store = store