import { instance } from "../../../common/instance/instance"

import { GetTaskResponse, DomainTask, UpdateTaskModel } from "./tasksApi.types"

import { Response } from "components/common/types"

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(payload: { title: string, todolistId: string }) {
    const { title, todolistId } = payload
    return instance.post<Response<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks`, { title })
  },
  removeTask(payload: { taskId: string, todolistId: string }) {
    const { taskId, todolistId } = payload
    return instance.delete<Response<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },

  changeTaskStatus(payload: { model: UpdateTaskModel, taskId: string, todolistId: string }) {
    const { model, taskId, todolistId } = payload
    return instance.put<Response<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
  changeTaskTitle(payload: {title: string, task: DomainTask, todolistId: string}) {
    const {title, task, todolistId} = payload
    return instance.put<Response<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks/${task.id}`, { title })
  },
}
