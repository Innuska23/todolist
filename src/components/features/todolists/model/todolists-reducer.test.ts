import {
  addTodolist,
  changeFilter,
  DomainTodolist,
  removeTodolist,
  todoListReducer,
  changeTodolistTitle,
} from "./todolistsSlice"
import { v1 } from "uuid"

let todolistId1: string
let todolistId2: string
let startState: DomainTodolist[] = []

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()

  startState = [
    { id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 1, entityStatus: "idle" },
    { id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 1, entityStatus: "idle" },
  ]
})

test("correct todolist should be removed", () => {
  const endState = todoListReducer(startState, removeTodolist({ id: todolistId1 }))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", () => {
  const endState = todoListReducer(
    startState,
    addTodolist({
      todolist: {
        id: todolistId2,
        addedDate: "",
        order: 1,
        title: "New Todolist",
      },
    }),
  )

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe("New Todolist")
})

test("correct todolist should change its name", () => {
  const endState = todoListReducer(startState, changeTodolistTitle({ id: todolistId2, title: "New Todolist" }))

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe("New Todolist")
})

test("correct filter of todolist should be changed", () => {
  const endState = todoListReducer(startState, changeFilter({ id: todolistId2, filter: "completed" }))

  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe("completed")
})
