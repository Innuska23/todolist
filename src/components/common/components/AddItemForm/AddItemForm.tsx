import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded"
import { Box, IconButton, TextField } from "@mui/material"

import { useAddItemForm } from "components/common/hooks/useAddItemForm"

import { addItemFormSx } from "./AddItemForm.styles"

type AddItemFormPropsType = {
  addItem: (title: string) => void
  disabled?: boolean
  maxLength?: number
}

export const AddItemForm = ({ addItem, disabled, maxLength }: AddItemFormPropsType) => {
  const { inputValue, inputError, changeItemTitleHandler, handleAddItem, addItemOnKeyUpHandler, isValid } =
    useAddItemForm({ addItem, maxLength })

  return (
    <Box sx={addItemFormSx}>
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
      <IconButton onClick={handleAddItem} disabled={!isValid || disabled}>
        <AddCircleOutlineRoundedIcon />
      </IconButton>
    </Box>
  )
}
