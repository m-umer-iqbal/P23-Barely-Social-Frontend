import React from "react"
import SignUp from "./pages/SignUp"
import LogIn from "./pages/LogIn"
import Home from "./pages/Home"
import Logo from "./components/Logo"
import { createBrowserRouter, RouterProvider } from "react-router"
import { GlobalRefreshContextUpdate } from "./context/context"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Logo width="100vw" slash="true" />
    },
    {
      path: "/home",
      element: <Home />
    },
    {
      path: "/create-account",
      element: <SignUp />
    },
    {
      path: "/login",
      element: <LogIn />
    }
  ])
  return (
    <GlobalRefreshContextUpdate>
      <div>
        <RouterProvider router={router} />
      </div>
    </GlobalRefreshContextUpdate>
  )
}

export default App;
