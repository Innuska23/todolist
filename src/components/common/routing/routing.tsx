import { Route, Routes } from "react-router"

import { Main } from "components/app/Main"
import { Login } from "components/features/auth/ui/login/Login"
import { Page404 } from "../components/Page404/Page404"

export const Path = {
  Main: "/",
  Login: "login",
  NotFound: "*",
} as const

export const Routing = () => {
  return (
    <Routes>
      <Route index path={Path.Main} element={<Main />} />
      <Route path={Path.Login} element={<Login />} />
      <Route path={Path.NotFound} element={<Page404 />} />
    </Routes>
  )
}
