import { changeTheme, selectThemeMode } from "components/app/appSlice"
import { useAppDispatch } from "./useAppDispatch"
import { useAppSelector } from "./useAppSelector"

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