import React from "react"
import { TextField } from "@mui/material"

import { useEditableField } from "../../hooks/useEditableField"

type EditableSpanPropsType = {
  value: string
  className?: string
  onChange: (newTitle: string) => void
  disabled: boolean
}

export const EditableSpan: React.FC<EditableSpanPropsType> = ({ value, className, onChange, disabled }) => {
  const {
    isEditing,
    value: currentValue,
    error,
    handleEdit,
    handleChange,
  } = useEditableField({
    initialValue: value,
    onSave: onChange,
    disabled,
  })

  return isEditing ? (
    <TextField
      variant="outlined"
      value={currentValue}
      size="small"
      autoFocus
      onBlur={handleEdit}
      onChange={handleChange}
      error={error}
      helperText={error ? "Title is required" : ""}
      sx={{ mb: 1 }}
      disabled={disabled}
    />
  ) : (
    <span className={className} onDoubleClick={!disabled ? handleEdit : undefined}>
      {value}
    </span>
  )
}
