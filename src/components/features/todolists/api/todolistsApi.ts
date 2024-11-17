import { Response } from "components/common/types"
import { instance } from "../../../common/instance/instance"

import { Todolist } from "./todolistsApi.types"

export const todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>("todo-lists")
  },
  updateTodolist(payload: { id: string, title: string }) {
    const { id, title } = payload
    return instance.put<Response>(`todo-lists/${id}`, { title })
  },
  removeTodolist(id: string) {
    return instance.delete<Response>(`todo-lists/${id}`, {})
  },
  createTodolist(title: string) {
    return instance.post<Response<{ item: Todolist }>>("todo-lists", { title })
  },
}
