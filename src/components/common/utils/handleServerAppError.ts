import { Dispatch } from "redux"
import { setAppError, setAppStatus } from "../../app/appSlice"
import { Response } from "../types"

export const handleServerAppError = <T>(data: Response<T>, dispatch: Dispatch) => {
  const errorMessage = data.messages.length ? data.messages[0] : "Some error occurred"
  dispatch(setAppError({ error: errorMessage }))
  dispatch(setAppStatus({ status: "failed" }))
}
