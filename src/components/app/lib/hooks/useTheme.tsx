import { ThemeMode } from "components/app/appSlice"
import { loadThemeFromLocalStorage, saveThemeToLocalStorage } from "components/common/theme"
import { useEffect, useState } from "react"

export const useTheme = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(loadThemeFromLocalStorage() as ThemeMode)

  useEffect(() => {
    saveThemeToLocalStorage(themeMode)
  }, [themeMode])

  return { themeMode, setThemeMode }
}
