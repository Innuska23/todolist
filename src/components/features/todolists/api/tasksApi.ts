import { instance } from "../../../common/instance/instance"
import { baseApi } from "./baseApi"

import { GetTaskResponse, DomainTask, UpdateTaskModel } from "./tasksApi.types"
import { Response } from "../../../common/types"

export const PAGE_SIZE = 10

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTaskResponse, { todolistId: string; args: { page: number } }>({
      query: ({ todolistId, args }) => ({
        method: 'GET',
        url: `todo-lists/${todolistId}/tasks`,
        params: { ...args, count: PAGE_SIZE },
      }),
      providesTags: (res, err, { todolistId }) =>
        res
          ? [
            ...res.items.map(({ id }) => ({ type: 'Task', id }) as const),
            { type: 'Task', id: todolistId },
          ]
          : ['Task'],
    }),
    createTask: build.mutation<Response<{ item: DomainTask }>, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => ({
        url: `todo-lists/${todolistId}/tasks`,
        method: 'POST',
        body: { title },
      }),
      invalidatesTags: (res, err, { todolistId }) => [{ type: 'Task', id: todolistId }],
    }),
    removeTask: build.mutation<Response<{ item: DomainTask }>, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (res, err, { taskId }) => [{ type: 'Task', id: taskId }],
    }),
    updateTask: build.mutation<Response<{ item: DomainTask }>, { todolistId: string; taskId: string; model: Partial<UpdateTaskModel> }>({
      query: ({ todolistId, taskId, model }) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: 'PUT',
        body: model,
      }),
      invalidatesTags: (res, err, { taskId }) => [{ type: 'Task', id: taskId }],
    }),
  })
})

export const { useGetTasksQuery, useCreateTaskMutation, useRemoveTaskMutation, useUpdateTaskMutation } = tasksApi

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
