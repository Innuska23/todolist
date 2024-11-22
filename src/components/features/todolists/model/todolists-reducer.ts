import { AppDispatch } from "./../../../app/store"

import { FilterValuesType } from "../../../app/App"
import { Todolist } from "../api/todolistsApi.types"
import { todolistsApi } from "../api/todolistsApi"
import { RequestStatus, setAppStatusAC } from "components/app/app-reducer"
import { ResultCode } from "components/common/enums"
import { handleServerAppError, handleServerNetworkError } from "components/common/utils"

export type DomainTodolist = Todolist & {
    filter: FilterValuesType
    entityStatus: RequestStatus
}

type ActionsType =
    | RemoveTodoACType
    | AddTodolistActionType
    | ChangeFilterACType
    | UpdateTodolistACType
    | SetTodolistsActionType
    | ChangeTodolistEntityStatusActionType

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
                entityStatus: 'idle'
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
            return action.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: 'idle' }))
        }
        case "CHANGE-TODOLIST-ENTITY-STATUS": {
            return state.map((tl) =>
                tl.id === action.payload.id ? { ...tl, entityStatus: action.payload.entityStatus } : tl,
            )
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
export type ChangeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>

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

export const changeTodolistEntityStatusAC = (payload: {
    id: string
    entityStatus: RequestStatus
}) => {
    return { type: 'CHANGE-TODOLIST-ENTITY-STATUS', payload } as const
}

export const fetchTodolistsTC = () => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistsApi.getTodolists().then((res) => {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(setTodolistsAC(res.data))
    }).catch((err) => {
        handleServerNetworkError(err, dispatch)
    })
}

export const addTodolistTC = (title: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistsApi.createTodolist(title).then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC("succeeded"));
            dispatch(addTodolistAC(res.data.data.item));
        } else {
            handleServerAppError(res.data, dispatch)
        }
    })
        .catch((err) => {
            handleServerNetworkError(err, dispatch);
        });
}

export const removeTodolistTC = (id: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(changeTodolistEntityStatusAC({ id, entityStatus: "loading" }))
    todolistsApi.removeTodolist(id).then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC("succeeded"))
            dispatch(removeTodoAC(id))
        } else {
            dispatch(changeTodolistEntityStatusAC({ id, entityStatus: "failed" }))
            handleServerAppError(res.data, dispatch)
        }
    })
        .catch((err) => {
            dispatch(changeTodolistEntityStatusAC({ id, entityStatus: "idle" }))
            handleServerNetworkError(err, dispatch)
        })
}

export const updateTodolistTitleTC = (arg: { id: string; title: string }) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistsApi.updateTodolist(arg).then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC("succeeded"))
            dispatch(updateTodolistAC(arg))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch((err) => {
        handleServerNetworkError(err, dispatch)
    });
}
