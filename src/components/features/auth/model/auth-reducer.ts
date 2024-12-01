import { Dispatch } from 'redux';
import { setAppStatusAC } from "components/app/app-reducer"
import { AppDispatch } from "components/app/store"
import { Inputs } from "components/features/auth/ui/login/login"
import { authApi } from "../api/authApi"
import { ResultCode } from "components/common/enums"
import { handleServerAppError, handleServerNetworkError } from "components/common/utils"
import { clearTodosDataAC } from 'components/features/todolists/model/todolists-reducer';

type InitialStateType = typeof initialState

const initialState = {
    isLoggedIn: false,
    isInitialized: false,
}

export const authReducer = (
    state: InitialStateType = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case 'SET_IS_LOGGED_IN':
            return { ...state, isLoggedIn: action.payload.isLoggedIn }
        case 'SET_IS_INITIALIZED':
            return { ...state, isInitialized: action.payload.isInitialized }
        default:
            return state
    }
}

const setIsLoggedInAC = (isLoggedIn: boolean) => {
    return { type: 'SET_IS_LOGGED_IN', payload: { isLoggedIn } } as const
}

const setIsInitializedAC = (isInitialized: boolean) => {
    return { type: 'SET_IS_INITIALIZED', payload: { isInitialized } } as const
}

type ActionsType = ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setIsInitializedAC>
    | ReturnType<typeof clearTodosDataAC>

export const loginTC = (data: Inputs) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'));
    authApi
        .login(data)
        .then((res) => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatusAC('succeeded'));
                dispatch(setIsLoggedInAC(true))
                localStorage.setItem('sn-token', res.data.data.token)
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch);
        });
};


export const logoutTC = () => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'));
    authApi
        .logout()
        .then((res) => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatusAC('succeeded'));
                dispatch(setIsLoggedInAC(false))
                localStorage.removeItem('sn-token')
                dispatch(clearTodosDataAC())
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch);
        });
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authApi
        .me()
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(setIsLoggedInAC(true))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        }).finally(() => {
            dispatch(setIsInitializedAC(true))
        })
}