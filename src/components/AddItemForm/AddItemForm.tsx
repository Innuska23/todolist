import { ChangeEventHandler, KeyboardEvent, useState } from "react"

import { Button } from "../Button/Button"

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = ({ addItem }: AddItemFormPropsType) => {

    const maxNumber = 10;

    const [inputValue, setInputValue] = useState('');
    const [inputError, setInputError] = useState('');


    const changeItemTitleHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.currentTarget.value;
        setInputValue(value);
        setInputError(validateInput(value));
    }

    const handleAddItem = () => {
        const trimmedValue = inputValue.trim();
        const error = validateInput(trimmedValue);
        if (!error) {
            addItem(trimmedValue);
            setInputValue('');
        } else {
            setInputError(error);
        }
    }

    const addItemOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAddItem()
        }
    }

    const validateInput = (value: string): string => {
        if (value.trim() === '') return 'Title is required';
        if (value.trim().length > maxNumber) return `Title should not exceed ${maxNumber} characters`;
        return '';
    }
    return (
        <>
            <div>
                <input
                    value={inputValue}
                    onChange={changeItemTitleHandler}
                    onKeyUp={addItemOnKeyUpHandler}
                    className={inputError ? "error" : ''} />
                < Button
                    title={'+'}
                    onClick={handleAddItem}
                    disabled={!!validateInput(inputValue)
                    }

                />
            </div>

            {
                inputError && (
                    <div style={{ color: 'red', marginTop: '8px' }}>{inputError}</div>
                )
            }
        </>
    )
}