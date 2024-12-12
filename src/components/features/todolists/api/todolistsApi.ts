import { Response } from "components/common/types"
import { instance } from "../../../common/instance/instance"
import { Todolist } from "./todolistsApi.types"
import { DomainTodolist } from "../model/todolistsSlice"
import { baseApi } from "./baseApi"

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      getTodolists: build.query<any[], void>({
        query: () => 'todo-lists',
        transformResponse(todolists: Todolist[]): DomainTodolist[] {
          return todolists.map(tl => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
        },
        providesTags: ['Todolist'],
      }),
      addTodolist: build.mutation<Response<{ item: Todolist }>, string>({
        query: (title) => {
          return {
            url: "todo-lists",
            method: "POST",
            body: { title }
          }
        },
        invalidatesTags: ['Todolist'],
      }),
      removeTodolist: build.mutation<Response, string>({
        query: (id) => {
          return {
            method: "DELETE",
            url: `todo-lists/${id}`,
          }
        },
        invalidatesTags: ['Todolist'],
      }),
      updateTodolistTitle: build.mutation<Response, { id: string; title: string }>({
        query: ({ id, title }) => {
          return {
            method: "PUT",
            url: `todo-lists/${id}`,
            body: {
              title,
            },
          }
        },
        invalidatesTags: ['Todolist'],
      }),
    }
  },
})

export const { useGetTodolistsQuery, useAddTodolistMutation, useRemoveTodolistMutation, useUpdateTodolistTitleMutation } = todolistsApi

export const _todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>("todo-lists")
  },
  updateTodolist(payload: { id: string; title: string }) {
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
