import { ChangeEventHandler, KeyboardEvent, useState } from "react"

interface UseAddItemFormProps {
    addItem: (title: string) => void
    maxLength?: number
}

export const useAddItemForm = ({ addItem, maxLength = 100 }: UseAddItemFormProps) => {
    const [inputValue, setInputValue] = useState("")
    const [inputError, setInputError] = useState("")

    const validateInput = (value: string): string => {
        if (value.trim() === "") return "Title is required"
        if (value.trim().length > maxLength) return `Title should not exceed ${maxLength} characters`
        return ""
    }

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

    return {
        inputValue,
        inputError,
        changeItemTitleHandler,
        handleAddItem,
        addItemOnKeyUpHandler,
        isValid: !validateInput(inputValue)
    }
}