import { SxProps } from "@mui/material"

export const addItemFormSx: SxProps = {
  display: "flex",
  alignItems: "flex-start",
  gap: 1,
  width: "100%",
  "& .MuiTextField-root": {
    flex: 1,
    backgroundColor: "background.paper",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "primary.light",
      },
      "&:hover fieldset": {
        borderColor: "primary.main",
      },
      "&.Mui-focused fieldset": {
        borderColor: "primary.main",
      },
    },
  },
  "& .MuiIconButton-root": {
    color: "primary.main",
    "&:hover": {
      color: "primary.dark",
    },
    "&.Mui-disabled": {
      color: "text.disabled",
    },
  },
}
