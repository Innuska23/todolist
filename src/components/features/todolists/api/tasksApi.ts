import { instance } from "../../../common/instance/instance"

import { GetTaskResponse, Task, UpdateTaskModel } from "./tasksApi.types"

import { TaskStatus } from "../../../common/enums"
import { Response } from "components/common/types"

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(title: string, todolistId: string) {
    return instance.post<Response<{ item: Task }>>(`todo-lists/${todolistId}/tasks`, { title })
  },
  removeTask(taskId: string, todolistId: string) {
    return instance.delete<Response<{ item: Task }>>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  changeTaskStatus(checked: boolean, task: Task, todolistId: string) {
    const model: UpdateTaskModel = {
      description: task.description,
      title: task.title,
      status: checked ? TaskStatus.Completed : TaskStatus.New,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    }
    return instance.put<Response<{ item: Task }>>(`todo-lists/${todolistId}/tasks/${task.id}`, model)
  },
  changeTaskTitle(title: string, task: Task, todolistId: string) {
    return instance.put<Response<{ item: Task }>>(`todo-lists/${todolistId}/tasks/${task.id}`, { title })
  },
}
