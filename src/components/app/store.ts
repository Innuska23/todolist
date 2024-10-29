import { combineReducers, legacy_createStore } from 'redux'

import { appReducer } from './app-reducer'
import { tasksReducer } from '../features/todolists/model/tasks-reducer'
import { todoListReducer } from '../features/todolists/model/todolists-reducer'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListReducer,

    app: appReducer
})

export const store = legacy_createStore(rootReducer)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store