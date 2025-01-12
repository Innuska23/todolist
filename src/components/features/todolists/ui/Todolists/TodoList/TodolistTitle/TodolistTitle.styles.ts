import { SxProps } from "@mui/material"

export const titleContainerSx: SxProps = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  mb: 2,
  "& .MuiTypography-root": {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#7a6899"
  }
}