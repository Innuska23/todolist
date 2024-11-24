import { tasksReducer, TasksStateType } from "./tasks-reducer"
import { addTodolistAC, DomainTodolist, todoListReducer } from "./todolists-reducer"

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: DomainTodolist[] = []

  const action = addTodolistAC({
    order: 1,
    title: "new todolist",
    addedDate: "",
    id: "new-id",
  })

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todoListReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
