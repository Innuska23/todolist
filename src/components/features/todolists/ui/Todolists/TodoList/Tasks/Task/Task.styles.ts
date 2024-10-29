import { SxProps } from '@mui/material'

export const formAddedContainerSx: SxProps = {
    justifyContent: 'space-between',
    display: 'flex'
}

export const taskTextSx = (isDone: boolean) => ({
    opacity: isDone ? 0.5 : 1,
    textDecoration: isDone ? 'line-through' : 'none'
})