import {
  // BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import SignInPage from './Pages/SignInPage.tsx'
import Header from './Components/Header.tsx'
import SignUpPage from "./Pages/SignUpPage.tsx";
import Homepage from "./Pages/Homepage.tsx";
import LandingPage from "./Pages/LandingPage.tsx";
import ErrorPage from "./Pages/PageNotFound.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [
      {
        index: true,
        element: <LandingPage />
      },
      {
        path: '/homepage/',
        element: <Homepage />
      },
      {
        path: 'sign-in',
        element: <SignInPage />
      },
      {
        path: 'sign-up',
        element: <SignUpPage />
      },
    ]
  },
  {
    path: '*',
    element: <ErrorPage error={"404: Page Not Found"}/>
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
