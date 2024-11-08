import { ChangeEventHandler, KeyboardEvent, useState } from "react"

import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded"
import { Box, IconButton, TextField } from "@mui/material"

type AddItemFormPropsType = {
  addItem: (title: string) => void
}

export const AddItemForm = ({ addItem }: AddItemFormPropsType) => {
  const maxNumber = 10

  const [inputValue, setInputValue] = useState("")
  const [inputError, setInputError] = useState("")

  const changeItemTitleHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.currentTarget.value
    setInputValue(value)
    setInputError(validateInput(value))
  }

  const handleAddItem = () => {
    const trimmedValue = inputValue.trim()
    const error = validateInput(trimmedValue)
    if (!error) {
      addItem(trimmedValue)
      setInputValue("")
    } else {
      setInputError(error)
    }
  }

  const addItemOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddItem()
    }
  }

  const validateInput = (value: string): string => {
    if (value.trim() === "") return "Title is required"
    if (value.trim().length > maxNumber) return `Title should not exceed ${maxNumber} characters`
    return ""
  }

  return (
    <>
      <Box>
        <TextField
          size="small"
          value={inputValue}
          placeholder="Add title"
          onChange={changeItemTitleHandler}
          onKeyUp={addItemOnKeyUpHandler}
          error={!!inputError}
          helperText={inputError}
        />
        <IconButton onClick={handleAddItem} disabled={!!validateInput(inputValue)}>
          <AddCircleOutlineRoundedIcon />
        </IconButton>
      </Box>
    </>
  )
}
