import { ChangeEventHandler, KeyboardEvent, useState } from "react"
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded"
import { Box, IconButton, TextField } from "@mui/material"

type AddItemFormPropsType = {
  addItem: (title: string) => void
  disabled?: boolean
}

export const AddItemForm = ({ addItem, disabled }: AddItemFormPropsType) => {
  const maxNumber = 100
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
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 1,
        width: "100%",
        "& .MuiTextField-root": {
          flex: 1,
          backgroundColor: "background.paper",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "primary.light",
            },
            "&:hover fieldset": {
              borderColor: "primary.main",
            },
            "&.Mui-focused fieldset": {
              borderColor: "primary.main",
            },
          },
        },
        "& .MuiIconButton-root": {
          color: "primary.main",
          "&:hover": {
            color: "primary.dark",
          },
          "&.Mui-disabled": {
            color: "text.disabled",
          },
        },
      }}
    >
      <TextField
        size="small"
        value={inputValue}
        placeholder="Add title"
        onChange={changeItemTitleHandler}
        onKeyUp={addItemOnKeyUpHandler}
        error={!!inputError}
        helperText={inputError}
        disabled={disabled}
      />
      <IconButton onClick={handleAddItem} disabled={!!validateInput(inputValue) || disabled}>
        <AddCircleOutlineRoundedIcon />
      </IconButton>
    </Box>
  )
}
