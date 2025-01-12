import { SxProps } from "@mui/material"

export const formAddedContainerSx: SxProps = {
  justifyContent: "space-between",
  display: "flex",
  width: "100%"
}

export const taskTextSx = (isDone: boolean) => ({
  display: "flex",
  alignItems: "center",
  flex: 1,
  mr: 1,
  opacity: isDone ? 0.5 : 1,
  textDecoration: isDone ? "line-through" : "none",
  transition: "opacity 0.2s ease",
  "& .MuiCheckbox-root": {
    color: "#7a6899",
    "&.Mui-checked": {
      color: "#7a6899",
    }
  }
})