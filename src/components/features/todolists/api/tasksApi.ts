import { instance } from "../../../common/instance/instance"
import { baseApi } from "./baseApi"

import { GetTaskResponse, DomainTask, UpdateTaskModel, DomainTaskUi } from "./tasksApi.types"

import { Response } from "components/common/types"

export const tasksApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getTasks: build.query<DomainTaskUi[], string>({
      query: (todolistId) => `todo-lists/${todolistId}/tasks`,
      transformResponse(response: GetTaskResponse): DomainTaskUi[] {
        return response?.items.map(task => ({
          ...task,
          isLoading: false
        }))
      },
      providesTags: ['Task'],
    }),
    createTask: build.mutation<Response<{ item: DomainTask }>, { todolistId: string, title: string }>({
      query: ({ todolistId, title }) => {
        return {
          url: `todo-lists/${todolistId}/tasks`,
          method: "POST",
          body: { title }
        }
      },
      invalidatesTags: ['Task']
    })
  })
})

export const { useGetTasksQuery, useCreateTaskMutation } = tasksApi

export const _tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(payload: { title: string; todolistId: string }) {
    const { title, todolistId } = payload
    return instance.post<Response<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks`, { title })
  },
  removeTask(payload: { taskId: string; todolistId: string }) {
    const { taskId, todolistId } = payload
    return instance.delete<Response<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },

  changeTaskStatus(payload: { model: UpdateTaskModel; taskId: string; todolistId: string }) {
    const { model, taskId, todolistId } = payload
    return instance.put<Response<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
  changeTaskTitle(payload: { title: string; task: DomainTask; todolistId: string }) {
    const { title, task, todolistId } = payload
    return instance.put<Response<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks/${task.id}`, { title })
  },
}
