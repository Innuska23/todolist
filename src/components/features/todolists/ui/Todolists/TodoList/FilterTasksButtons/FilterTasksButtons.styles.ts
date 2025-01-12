import { SxProps } from "@mui/material"

export const filterButtonsContainerSx: SxProps = {
  display: "flex",
  justifyContent: "space-between",
  mt: 2,
  "& .MuiButton-root": {
    flex: 1,
    mx: 0.5,
    textTransform: "none",
    borderColor: "#7a6899",
    color: "#7a6899",
    transition: "all 0.2s ease",
    "&:hover": {
      borderColor: "#8a77aa",
      bgcolor: "rgba(122, 104, 153, 0.1)",
      transform: "scale(1.02)",
    },
    "&.active": {
      bgcolor: "#7a6899",
      color: "#fff",
    }
  }
}