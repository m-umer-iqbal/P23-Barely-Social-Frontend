import React from "react"
import CreateAccount from "./pages/CreateAccount"
import Login from "./pages/Login"
import Home from "./pages/Home"
import { createBrowserRouter, RouterProvider } from "react-router"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/create-account",
      element: <CreateAccount />
    },
    {
      path: "/login",
      element: <Login />
    }
  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App;
