import { Todolist } from "../../api/todolistsApi.types"
import { RequestStatus } from "../../../../app/appSlice"

export type FilterValues = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValues
    entityStatus: RequestStatus
}


export type DomainTodolist = Todolist & {
    filter: FilterValues
    entityStatus: RequestStatus
}
