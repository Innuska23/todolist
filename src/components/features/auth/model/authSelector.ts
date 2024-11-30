import { RootState } from "components/app/store";

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn
export const selectIsInitialized = (state: RootState) => state.auth.isInitialized