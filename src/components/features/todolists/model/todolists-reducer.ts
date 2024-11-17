import { AppDispatch } from "./../../../app/store"

import { FilterValuesType } from "../../../app/App"
import { Todolist } from "../api/todolistsApi.types"
import { todolistsApi } from "../api/todolistsApi"

export type DomainTodolist = Todolist & {
    filter: FilterValuesType
}

type ActionsType =
    | RemoveTodoACType
    | AddTodolistActionType
    | ChangeFilterACType
    | UpdateTodolistACType
    | SetTodolistsActionType

const initialState: DomainTodolist[] = []

export const todoListReducer = (state: DomainTodolist[] = initialState, action: ActionsType): DomainTodolist[] => {
    switch (action.type) {
        case "REMOVE_TODOLIST": {
            return state.filter((tl) => tl.id !== action.payload.id)
        }
        case "ADD_TODOLIST": {
            const newTodo: DomainTodolist = {
                id: action.payload.todolist.id,
                title: action.payload.todolist.title,
                filter: "all",
                addedDate: action.payload.todolist.addedDate,
                order: action.payload.todolist.order,
            }
            return [newTodo, ...state]
        }
        case "CHANGE_TODOLIST_TITLE": {
            return state.map((todo) => (todo.id === action.payload.id ? { ...todo, title: action.payload.title } : todo))
        }
        case "CHANGE_TODOLIST_FILTER": {
            return state.map((filter) =>
                filter.id === action.payload.id ? { ...filter, filter: action.payload.filter } : filter,
            )
        }
        case "SET-TODOLISTS": {
            return action.todolists.map((tl) => ({ ...tl, filter: "all" }))
        }
        default:
            return state
    }
}

export type RemoveTodoACType = ReturnType<typeof removeTodoAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type UpdateTodolistACType = ReturnType<typeof updateTodolistAC>
export type ChangeFilterACType = ReturnType<typeof changeFilterAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

export const removeTodoAC = (id: string) => {
    return {
        type: "REMOVE_TODOLIST",
        payload: {
            id,
        },
    } as const
}

export const addTodolistAC = (todolist: Todolist) => {
    return {
        type: "ADD_TODOLIST",
        payload: { todolist },
    } as const
}

export const updateTodolistAC = (payload: { id: string; title: string }) => {
    return {
        type: "CHANGE_TODOLIST_TITLE",
        payload,
    } as const
}

export const changeFilterAC = (payload: { id: string; filter: FilterValuesType }) => {
    return {
        type: "CHANGE_TODOLIST_FILTER",
        payload,
    } as const
}

export const setTodolistsAC = (todolists: Todolist[]) => {
    return {
        type: "SET-TODOLISTS",
        todolists,
    } as const
}

export const fetchTodolistsTC = () => (dispatch: AppDispatch) => {
    todolistsApi.getTodolists().then((res) => {
        dispatch(setTodolistsAC(res.data))
    })
}

export const addTodolistTC = (title: string) => (dispatch: AppDispatch) => {
    todolistsApi.createTodolist(title).then((res) => {
        dispatch(addTodolistAC(res.data.data.item))
    })
}

export const removeTodolistTC = (id: string) => (dispatch: AppDispatch) => {
    todolistsApi.removeTodolist(id).then(() => {
        dispatch(removeTodoAC(id))
    })
}

export const updateTodolistTitleTC = (arg: { id: string; title: string }) => (dispatch: AppDispatch) => {
    todolistsApi.updateTodolist(arg).then(() => {
        dispatch(updateTodolistAC(arg))
    })
}
