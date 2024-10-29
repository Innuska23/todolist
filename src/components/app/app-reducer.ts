export type ThemeMode = 'dark' | 'light'

type InitialState = typeof initialState

const initialState = {
    themeMode: 'light' as ThemeMode,
}

export const appReducer = (
    state: InitialState = initialState,
    action: ActionsType
): InitialState => {
    switch (action.type) {
        case 'CHANGE_THEME':
            return {
                ...state,
                themeMode: action.payload.themeMode
            }
        default:
            return state
    }
}

export type changeThemeACType = ReturnType<typeof changeThemeAC>

export const changeThemeAC = (themeMode: ThemeMode) => {
    return {
        type: 'CHANGE_THEME',
        payload: {
            themeMode
        },
    } as const
}

type ActionsType = changeThemeACType