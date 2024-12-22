import { TaskPriority, TaskStatus } from "../../../common/enums"

export type DomainTask = {
  description: string | null
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type DomainTaskUi = DomainTask & {
  isLoading?: boolean
}

export type GetTaskResponse = {
  totalCount: number
  error: string
  items: DomainTaskUi[]
}

export type UpdateTaskModel = {
  description: string | null
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
}
