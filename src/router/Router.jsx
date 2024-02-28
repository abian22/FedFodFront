import { createBrowserRouter, redirect } from "react-router-dom";
import Root from "../layout/Root";
import LandingPage from "../pages/LandingPage/LandingPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/home",
    element: <Root />,
    loader: () => {
      if (!localStorage.getItem("token")) {
        return redirect({ to: "/" });
      } else {
        return null;
      }
    },
    children: [
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
]);

export default router;
  