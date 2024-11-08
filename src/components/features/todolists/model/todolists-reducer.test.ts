import { TodolistType } from "../../../app/App"
import { addNewTodoListAC, changeFilterAC, removeTodoAC, todoListReducer, updateTodolistAC } from "./todolists-reducer"
import { v1 } from "uuid"

let todolistId1: string
let todolistId2: string
let startState: TodolistType[] = []

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()

  startState = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]
})

test("correct todolist should be removed", () => {
  const endState = todoListReducer(startState, removeTodoAC(todolistId1))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", () => {
  const endState = todoListReducer(startState, addNewTodoListAC("New Todolist"))

  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe("New Todolist")
})

test("correct todolist should change its name", () => {
  const endState = todoListReducer(startState, updateTodolistAC({ id: todolistId2, title: "New Todolist" }))

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe("New Todolist")
})

test("correct filter of todolist should be changed", () => {
  const endState = todoListReducer(startState, changeFilterAC({ id: todolistId2, filter: "completed" }))

  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe("completed")
})
