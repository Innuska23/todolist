import { FilterValuesType, TodolistType } from '../App'
import { v1 } from 'uuid'

export type RemoveTodolistActionType = {
    type: 'REMOVE_TODOLIST'
    payload: {
        id: string
    }
}

export type AddTodolistActionType = {
    type: 'ADD_TODOLIST'
    payload: {
        title: string
        id: string
    }
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        id: string
        title: string
    }
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        id: string
        filter: FilterValuesType
    }
}

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

const initialState: TodolistType[] = []

export const todoListReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id)
        }
        case 'ADD_TODOLIST': {
            const newTodo: TodolistType = {
                id: action.payload.id,
                title: action.payload.title,
                filter: 'all'
            }
            return [...state, newTodo]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map((todo) => todo.id === action.payload.id ? { ...todo, title: action.payload.title } : todo);
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(filter => filter.id === action.payload.id ? { ...filter, filter: action.payload.filter } : filter)
        }
        default:
            return state;
    }
}

export type removeTodoACType = ReturnType<typeof removeTodoAC>

export const removeTodoAC = (id: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {
            id
        },
    } as const
}

export type addNewTodoListACType = ReturnType<typeof addNewTodoListAC>

export const addNewTodoListAC = (title: string) => {
    return {
        type: 'ADD_TODOLIST',
        payload: {
            title,
            id: v1()
        }
    } as const
}

export type updateTodolistACType = ReturnType<typeof updateTodolistAC>

export const updateTodolistAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id,
            title
        },
    } as const
}

export type changeFilterACType = ReturnType<typeof changeFilterAC>

export const changeFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id,
            filter
        },
    } as const
}