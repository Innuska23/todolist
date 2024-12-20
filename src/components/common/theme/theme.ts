import { createTheme } from "@mui/material/styles"
import { deepPurple } from "@mui/material/colors"

import { ThemeMode } from "../../app/appSlice"

export const getTheme = (themeMode: ThemeMode) => {
  return createTheme({
    palette: {
      mode: themeMode === "light" ? "light" : "dark",
      primary: {
        light: "#9683b8",
        main: "#7a6899",
        dark: "#5c4f73",
      },
      secondary: {
        light: deepPurple[300],
        main: deepPurple[500],
        dark: deepPurple[700],
      },
      background: {
        default: themeMode === "light" ? "#f5f5f7" : "#0a0812",
        paper: themeMode === "light" ? "#ffffff" : "#161226",
      },
      text: {
        primary: themeMode === "light" ? "#1a1a1a" : "#ffffff",
        secondary: themeMode === "light" ? "#4a4a4a" : "#a0a0a0",
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
          },
        },
      },
    },
  })
}


export const saveThemeToLocalStorage = (themeMode: ThemeMode) => {
  localStorage.setItem("themeMode", themeMode);
};

export const loadThemeFromLocalStorage = () => {
  return localStorage.getItem("themeMode") || "light";
};