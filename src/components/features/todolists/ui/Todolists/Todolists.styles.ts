import { Paper, styled } from "@mui/material"

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  minHeight: "350px",
  height: "600px",
  display: "flex",
  flexDirection: "column",
  border: `2px solid #7a6899`,
  boxShadow: `0 0 15px rgba(128, 0, 128, 0.3)`,
  borderRadius: theme.spacing(3),
  overflowWrap: "break-word",
  wordBreak: "break-all",
  whiteSpace: "normal",
  overflow: "auto",
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: theme.palette.background.paper,
  },
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.primary.main,
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: theme.palette.primary.dark,
  },
}))