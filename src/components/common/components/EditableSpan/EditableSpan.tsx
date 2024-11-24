import React, { ChangeEvent, useState } from "react"
import { TextField } from "@mui/material"

type EditableSpanPropsType = {
  value: string
  className?: string
  onChange: (newTitle: string) => void
  disabled: boolean
}

export const EditableSpan: React.FC<EditableSpanPropsType> = ({ value, className, onChange, disabled }) => {
  const [edit, setEdit] = useState(false)
  const [newTitle, setNewTitle] = useState(value)
  const [error, setError] = useState(false)

  const editHandler = () => {
    if (disabled) return
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
      disabled={disabled}
    />
  ) : (
    <span className={className} onDoubleClick={!disabled ? editHandler : undefined}>
      {value}
    </span>
  )
}
