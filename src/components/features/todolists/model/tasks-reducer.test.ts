import { v1 } from "uuid"

import { DomainTask } from "./../api/tasksApi.types"
import { addTask, removeTask, tasksReducer, TasksStateType, updateTask } from "./tasksSlice"
import { addTodolist, removeTodolist } from "./todolistsSlice"
import { TaskPriority, TaskStatus } from "components/common/enums"

let todolistId1: string
let todolistId2: string
let startState: TasksStateType = {}

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()

  startState = {
    [todolistId1]: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatus.Completed,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriority.Low,
        startDate: "",
        todoListId: todolistId1,
        isLoading: false,
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatus.Completed,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriority.Low,
        startDate: "",
        todoListId: todolistId1,
        isLoading: false,
      },
      {
        id: "3",
        title: "React",
        status: TaskStatus.New,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriority.Low,
        startDate: "",
        todoListId: todolistId1,
        isLoading: false,
      },
    ],
    [todolistId2]: [
      {
        id: "1",
        title: "bread",
        status: TaskStatus.New,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriority.Low,
        startDate: "",
        todoListId: todolistId2,
        isLoading: false,
      },
      {
        id: "2",
        title: "milk",
        status: TaskStatus.Completed,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriority.Low,
        startDate: "",
        todoListId: todolistId2,
        isLoading: false,
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatus.New,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriority.Low,
        startDate: "",
        todoListId: todolistId2,
        isLoading: false,
      },
    ],
  }
})

test("correct task should be deleted from correct array", () => {
  const endState = tasksReducer(startState, removeTask({ taskId: "2", todolistId: todolistId2 }))

  expect(endState).toEqual({
    [todolistId1]: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatus.Completed,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriority.Low,
        startDate: "",
        todoListId: todolistId1,
        isLoading: false,
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatus.Completed,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriority.Low,
        startDate: "",
        todoListId: todolistId1,
        isLoading: false,
      },
      {
        id: "3",
        title: "React",
        status: TaskStatus.New,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriority.Low,
        startDate: "",
        todoListId: todolistId1,
        isLoading: false,
      },
    ],
    [todolistId2]: [
      {
        id: "1",
        title: "bread",
        status: TaskStatus.New,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriority.Low,
        startDate: "",
        todoListId: todolistId2,
        isLoading: false,
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatus.New,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: TaskPriority.Low,
        startDate: "",
        todoListId: todolistId2,
        isLoading: false,
      },
    ],
  })
})

test("correct task should be added to correct array", () => {
  const newTask: DomainTask = {
    id: v1(),
    title: "juice",
    status: TaskStatus.New,
    addedDate: "",
    deadline: "",
    description: "",
    order: 0,
    priority: TaskPriority.Low,
    startDate: "",
    todoListId: todolistId2,
  }

  const endState = tasksReducer(startState, addTask({ todolistId: todolistId2, task: newTask }))

  expect(endState[todolistId1].length).toBe(3)
  expect(endState[todolistId2].length).toBe(4)
  expect(endState[todolistId2][0].id).toBeDefined()
  expect(endState[todolistId2][0].title).toBe("juice")
  expect(endState[todolistId2][0].status).toBe(TaskStatus.New)
})

test("status of specified task should be changed", () => {
  const endState = tasksReducer(
    startState,
    updateTask({
      taskId: "2",
      model: { status: TaskStatus.InProgress },
      todolistId: todolistId2,
    }),
  )

  expect(endState[todolistId2][1].status).toBe(TaskStatus.InProgress)
  expect(endState[todolistId1][1].status).toBe(TaskStatus.Completed)
  expect(endState[todolistId2][0].status).toBe(TaskStatus.New)
  expect(endState[todolistId2][2].status).toBe(TaskStatus.New)
})

test("title of specified task should be changed", () => {
  const endState = tasksReducer(
    startState,
    updateTask({
      taskId: "2",
      model: { title: "water" },
      todolistId: todolistId2,
    }),
  )

  expect(endState[todolistId2][1].title).toBe("water")
  expect(endState[todolistId1][1].title).toBe("JS")
})

test("new array should be added when new todolist is added", () => {
  const action = addTodolist({
    todolist: {
      id: "new-id",
      title: "new todolist",
      addedDate: "",
      order: 1,
    },
  })

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k !== todolistId1 && k !== todolistId2)
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState["new-id"]).toBeDefined()
  expect(endState["new-id"]).toEqual([])
})

test("property with todolistId should be deleted", () => {
  const action = removeTodolist({ id: todolistId2 })

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState[todolistId2]).toBeUndefined()
})
