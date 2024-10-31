import React, { ChangeEvent, useEffect, useState } from 'react'

import Checkbox from '@mui/material/Checkbox'
import { AddItemForm } from '../common/components/AddItemForm/AddItemForm'
import { EditableSpan } from '../common/components/EditableSpan/EditableSpan'

import axios from 'axios'
import { REACT_APP_API_KEY, REACT_APP_API_TOKEN } from './constant'

const apiKey = REACT_APP_API_KEY
const token = REACT_APP_API_TOKEN

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([])
  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({})

  type Todolist = {
    id: string,
    addedDate: string,
    order: number,
    title: string
  }

  type Task = {
    description: string | null
    title: string
    status: TaskStatus
    priority: number
    startDate: string | null
    deadline: string | null
    id: string
    todoListId: string
    order: number
    addedDate: string
  }

  enum TaskStatus {
    notReady = 0,
    done = 2,
  }

  type GetTaskResponse = {
    totalCount: number
    error: string
    items: Task[]
  }

  type UpdateTaskModel = {
    description: string | null
    title: string
    status: TaskStatus
    priority: number
    startDate: string | null
    deadline: string | null
  }

  type FieldsErrors = {
    error: string
  }

  type Response<T = {}> = {
    data: T
    resultCode: number
    messages: string[]
    fieldsErrors: FieldsErrors[]
  }

  useEffect(() => {
    axios.get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      const todolists = res.data;
      setTodolists(todolists);

      todolists.forEach(tl => {
        axios.get<GetTaskResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${tl.id}/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(res => {
          setTasks(prevTasks => ({
            ...prevTasks,
            [tl.id]: res.data.items
          }))
        }).catch((error) => {
          console.error('Eror: ', error);
        });
      })
    })
  }, [])

  const createTodolistHandler = (title: string) => {
    axios.post<Response<{ item: Todolist }>>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
      title
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': apiKey
      },
    }).then((res) => {
      const newTodolist = res.data.data.item;
      setTodolists([newTodolist, ...todolists]);
    })
  }

  const removeTodolistHandler = (id: string) => {
    axios.delete<Response>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': apiKey
      },
    }).then(() => {
      setTodolists(todolists.filter(tl => tl.id !== id));
    })
  }

  const updateTodolistHandler = (id: string, title: string) => {
    axios.put<Response>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, { title }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': apiKey
      },
    }).then(() => {
      setTodolists(prev => prev.map(tl => tl.id === id ? { ...tl, title } : tl));
    })
  }

  const createTaskHandler = (title: string, todolistId: string) => {
    axios.post<Response<{ item: Task }>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, {
      title
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': apiKey
      },
    }).then((res) => {
      const newTask = res.data.data.item;
      setTasks(prevTasks => ({
        ...prevTasks,
        [todolistId]: [newTask, ...(prevTasks[todolistId] || [])]
      }));
    })
  }

  const removeTaskHandler = (taskId: string, todolistId: string) => {
    axios.delete<Response<{ item: Task }>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': apiKey
      },
    }).then(() => {
      setTasks(prevTasks => ({
        ...prevTasks,
        [todolistId]: prevTasks[todolistId].filter(task => task.id !== taskId)
      }));
    })
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: Task, todolistId: string) => {
    const model: UpdateTaskModel = {
      description: task.description,
      title: task.title,
      status: e.currentTarget.checked ? TaskStatus.done : TaskStatus.notReady,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
    }
    axios.put<Response<{ item: Task }>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${task.id}`,
      model,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'API-KEY': apiKey,
        },
      }
    )
      .then((res) => {
        const newTask = res.data.data.item
        setTasks(prev => ({
          ...prev,
          [todolistId]: prev[todolistId].map(t => t.id === task.id ? newTask : t)
        }))
      });
  };

  const changeTaskTitleHandler = (title: string, task: Task, todolistId: string) => {
    axios.put<Response<{ item: Task }>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${task.id}`, { title },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'API-KEY': apiKey,
        },
      }
    )
      .then(() => {
        setTasks(prev => ({
          ...prev,
          [todolistId]: prev[todolistId].map(t => t.id === task.id ? { ...t, title } : t)
        }))
      });
  };

  return (
    <div style={{ margin: '20px' }}>
      <AddItemForm addItem={createTodolistHandler} />

      {/* Todolists */}
      {todolists.map((tl) => {
        return (
          <div key={tl.id} style={todolist}>
            <div>
              <EditableSpan
                value={tl.title}
                onChange={(title: string) => updateTodolistHandler(tl.id, title)}
              />
              <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
            </div>
            <AddItemForm addItem={title => createTaskHandler(title, tl.id)} />

            {/* Tasks */}
            {!!tasks[tl.id] &&
              tasks[tl.id].map(task => {
                return (
                  <div key={task.id}>
                    <Checkbox
                      checked={task.status === TaskStatus.done}
                      onChange={e => changeTaskStatusHandler(e, task, tl.id)}
                    />
                    <EditableSpan
                      value={task.title}
                      onChange={title => changeTaskTitleHandler(title, task, tl.id)}
                    />
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
  border: '1px solid black',
  margin: '20px 0',
  padding: '10px',
  width: '300px',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
}