import { combineReducers, legacy_createStore } from 'redux'

import { tasksReducer } from '../../model/tasks-reducer'
import { todoListReducer } from '../../model/todolists-reducer'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListReducer,
})

export const store = legacy_createStore(rootReducer)


export type RootState = ReturnType<typeof store.getState>

// @ts-ignore
window.store = store