import Paper from "@mui/material/Paper"
import Skeleton from "@mui/material/Skeleton"

import s from "./TodolistSkeleton.module.css"

export const TodolistSkeleton = () => {
  return (
    <Paper className={s.todolist}>
      <div className={s.todolistTitle}>
        <Skeleton width={150} height={50} />
        <Skeleton width={20} height={40} />
      </div>

      <div className={s.addItemForm}>
        <Skeleton width={275} height={60} />
        <Skeleton width={20} height={40} />
      </div>

      <>
        {Array(10)
          .fill(null)
          .map((_, id) => (
            <div key={id} className={s.common}>
              <div className={s.containerTasks}>
                <div className={s.tasks}>
                  <Skeleton width={20} height={40} />
                  <Skeleton width={150} height={40} />
                </div>
                <Skeleton width={20} height={40} />
              </div>
            </div>
          ))}
      </>

      <div className={s.common}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <Skeleton key={id} width={80} height={60} />
          ))}
      </div>
    </Paper>
  )
}
