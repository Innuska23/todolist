import { ChangeEvent, useState } from "react"

type EditableSpanPropsType = {
    value: string
    className?: string
    onChange: (newTitle: string) => void
}

export const EditableSpan = ({ value, className, onChange }: EditableSpanPropsType) => {
    const [edit, setEdit] = useState(false);
    const [newtitle, setNewTitle] = useState(value)

    const editHandler = () => {
        setEdit(!edit)
        if (edit) {
            onChange(newtitle);
        }
    }

    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    return (
        edit
            ? <input
                value={newtitle}
                autoFocus
                onBlur={editHandler}
                onChange={changeTitleHandler}
            />
            : <span
                className={className}
                onDoubleClick={editHandler}>{value}</span>
    )
}