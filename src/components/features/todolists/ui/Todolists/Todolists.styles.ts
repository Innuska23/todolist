import { Paper, styled } from "@mui/material"

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  minHeight: "350px",
  display: "flex",
  flexDirection: "column",
  border: `3px solid #7a6899`,
  boxShadow: `0 0 15px rgba(128, 0, 128, 0.3)`,
  borderRadius: theme.spacing(3),
  overflowWrap: "break-word",
  wordBreak: "break-all",
  whiteSpace: "normal",
  backdropFilter: 'blur(10px)',
  background: 'rgba(255, 255, 255, 0.05)',
  transition: 'all 0.3s ease',

  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: `0 0 25px rgba(128, 0, 128, 0.5)`,
    border: `3px solid #8a77aa`,
  }
}))