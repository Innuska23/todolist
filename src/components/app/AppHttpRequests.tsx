import React, { ChangeEvent, useEffect, useState } from "react"

import Checkbox from "@mui/material/Checkbox"

import { Task } from "../features/todolists/api/tasksApi.types"
import { todolistsApi } from "../features/todolists/api/todolistsApi"
import { tasksApi } from "../features/todolists/api/tasksApi"
import { Todolist } from "../features/todolists/api/todolistsApi.types"
import { TaskStatus } from "../common/enums"
import { AddItemForm } from "../common/components/AddItemForm"
import { EditableSpan } from "../common/components/EditableSpan"

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([])
  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({})

  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      const todolists = res.data
      setTodolists(todolists)

      todolists.forEach((tl) => {
        tasksApi
          .getTasks(tl.id)
          .then((res) => {
            setTasks((prevTasks) => ({
              ...prevTasks,
              [tl.id]: res.data.items,
            }))
          })
          .catch((error) => {
            console.error("Eror: ", error)
          })
      })
    })
  }, [])

  const createTodolistHandler = (title: string) => {
    todolistsApi.createTodolist(title).then((res) => {
      const newTodolist = res.data.data.item
      setTodolists([newTodolist, ...todolists])
    })
  }

  const removeTodolistHandler = (id: string) => {
    todolistsApi.removeTodolist(id).then(() => {
      setTodolists(todolists.filter((tl) => tl.id !== id))
    })
  }

  const updateTodolistHandler = (id: string, title: string) => {
    todolistsApi.updateTodolist(id, title).then(() => {
      setTodolists((prev) => prev.map((tl) => (tl.id === id ? { ...tl, title } : tl)))
    })
  }

  const createTaskHandler = (title: string, todolistId: string) => {
    tasksApi.createTask(title, todolistId).then((res) => {
      const newTask = res.data.data.item
      setTasks((prevTasks) => ({
        ...prevTasks,
        [todolistId]: [newTask, ...(prevTasks[todolistId] || [])],
      }))
    })
  }

  const removeTaskHandler = (taskId: string, todolistId: string) => {
    tasksApi.removeTask(taskId, todolistId).then(() => {
      setTasks((prevTasks) => ({
        ...prevTasks,
        [todolistId]: prevTasks[todolistId].filter((task) => task.id !== taskId),
      }))
    })
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: Task, todolistId: string) => {
    tasksApi.changeTaskStatus(e.currentTarget.checked, task, todolistId).then((res) => {
      const newTask = res.data.data.item
      setTasks((prev) => ({
        ...prev,
        [todolistId]: prev[todolistId].map((t) => (t.id === task.id ? newTask : t)),
      }))
    })
  }

  const changeTaskTitleHandler = (title: string, task: Task, todolistId: string) => {
    tasksApi.changeTaskTitle(title, task, todolistId).then(() => {
      setTasks((prev) => ({
        ...prev,
        [todolistId]: prev[todolistId].map((t) => (t.id === task.id ? { ...t, title } : t)),
      }))
    })
  }

  return (
    <div style={{ margin: "20px" }}>
      <AddItemForm addItem={createTodolistHandler} />

      {/* Todolists */}
      {todolists.map((tl) => {
        return (
          <div key={tl.id} style={todolist}>
            <div>
              <EditableSpan value={tl.title} onChange={(title: string) => updateTodolistHandler(tl.id, title)} />
              <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
            </div>
            <AddItemForm addItem={(title) => createTaskHandler(title, tl.id)} />

            {/* Tasks */}
            {!!tasks[tl.id] &&
              tasks[tl.id].map((task) => {
                return (
                  <div key={task.id}>
                    <Checkbox
                      checked={task.status === TaskStatus.Completed}
                      onChange={(e) => changeTaskStatusHandler(e, task, tl.id)}
                    />
                    <EditableSpan value={task.title} onChange={(title) => changeTaskTitleHandler(title, task, tl.id)} />
                    <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                  </div>
                )
              })}
          </div>
        )
      })}
    </div>
  )
}

// Styles
const todolist: React.CSSProperties = {
  border: "1px solid black",
  margin: "20px 0",
  padding: "10px",
  width: "300px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
}
