import React, { ChangeEvent, useState } from "react"
import { TextField } from "@mui/material"

type EditableSpanPropsType = {
  value: string
  className?: string
  onChange: (newTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = ({ value, className, onChange }) => {
  const [edit, setEdit] = useState(false)
  const [newTitle, setNewTitle] = useState(value)
  const [error, setError] = useState(false)

  const editHandler = () => {
    if (edit) {
      if (newTitle.trim() !== "") {
        onChange(newTitle)
        setError(false)
      } else {
        setError(true)
        return
      }
    }
    setEdit(!edit)
  }

  const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.currentTarget.value)
    setError(false)
  }

  return edit ? (
    <TextField
      variant="outlined"
      value={newTitle}
      size="small"
      autoFocus
      onBlur={editHandler}
      onChange={changeTitleHandler}
      error={error}
      helperText={error ? "Title is required" : ""}
      sx={{ mb: 1 }}
    />
  ) : (
    <span className={className} onDoubleClick={editHandler}>
      {value}
    </span>
  )
}
