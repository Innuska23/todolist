import { Dispatch } from "redux"
import { setAppErrorAC, setAppStatusAC } from "../../app/app-reducer"
import { Response } from "../types"

export const handleServerAppError = <T>(data: Response<T>, dispatch: Dispatch) => {
  const errorMessage = data.messages.length ? data.messages[0] : "Some error occurred"
  dispatch(setAppErrorAC(errorMessage))
  dispatch(setAppStatusAC("failed"))
}
