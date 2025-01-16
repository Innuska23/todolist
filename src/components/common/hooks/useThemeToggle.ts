import { changeTheme, selectThemeMode } from "../../app/appSlice"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useAppSelector } from "../hooks/useAppSelector"

export const useThemeToggle = () => {
    const dispatch = useAppDispatch()
    const currentTheme = useAppSelector(selectThemeMode)

    const toggleTheme = () => {
        const newMode = currentTheme === "light" ? "dark" : "light"
        dispatch(changeTheme({ themeMode: newMode }))
    }

    return {
        currentTheme,
        toggleTheme
    }
}