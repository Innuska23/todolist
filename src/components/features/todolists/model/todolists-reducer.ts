
import { v1 } from 'uuid'
import { FilterValuesType } from '../../../app/App'
import { Todolist } from '../api/todolistsApi.types'
import { Dispatch } from 'redux'
import { todolistsApi } from '../api/todolistsApi'

export type DomainTodolist = Todolist & {
    filter: FilterValuesType
}

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
    | SetTodolistsActionType

const initialState: DomainTodolist[] = []

export const todoListReducer = (state: DomainTodolist[] = initialState, action: ActionsType): DomainTodolist[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id)
        }
        case 'ADD_TODOLIST': {
            const newTodo: DomainTodolist = {
                id: action.payload.id,
                title: action.payload.title,
                filter: 'all',
                addedDate: '',
                order: 1
            }
            return [...state, newTodo]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map((todo) => todo.id === action.payload.id ? { ...todo, title: action.payload.title } : todo);
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(filter => filter.id === action.payload.id ? { ...filter, filter: action.payload.filter } : filter)
        }
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({ ...tl, filter: 'all' }))
        }
        default:
            return state;
    }
}

export type removeTodoACType = ReturnType<typeof removeTodoAC>
export type addNewTodoListACType = ReturnType<typeof addNewTodoListAC>
export type updateTodolistACType = ReturnType<typeof updateTodolistAC>
export type changeFilterACType = ReturnType<typeof changeFilterAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

export const removeTodoAC = (id: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {
            id
        },
    } as const
}

export const addNewTodoListAC = (title: string) => {
    return {
        type: 'ADD_TODOLIST',
        payload: {
            title,
            id: v1()
        }
    } as const
}

export const updateTodolistAC = (payload: { id: string, title: string }) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload
    } as const
}

export const changeFilterAC = (payload: { id: string, filter: FilterValuesType }) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload
    } as const
}

export const setTodolistsAC = (todolists: Todolist[]) => {
    return {
        type: 'SET-TODOLISTS',
        todolists
    } as const
}

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    todolistsApi.getTodolists().then(res => {
        dispatch(setTodolistsAC(res.data))
    })
}