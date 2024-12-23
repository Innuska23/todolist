import { ChangeEvent, useState } from "react"

interface UseEditableFieldProps {
    initialValue: string
    onSave: (newValue: string) => void
    disabled: boolean
}

export const useEditableField = ({ initialValue, onSave, disabled }: UseEditableFieldProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [value, setValue] = useState(initialValue)
    const [error, setError] = useState(false)

    const handleEdit = () => {
        if (disabled) return

        if (isEditing) {
            if (value.trim() !== "") {
                onSave(value)
                setError(false)
            } else {
                setError(true)
                return
            }
        }
        setIsEditing(!isEditing)
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
        setError(false)
    }

    if (!isEditing && value !== initialValue) {
        setValue(initialValue)
    }

    return {
        isEditing,
        value,
        error,
        handleEdit,
        handleChange
    }
}