import { createBrowserRouter, redirect } from "react-router-dom";
import Root from "../layout/Root";
import LandingPage from "../pages/LandingPage/LandingPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import Chat from "../pages/Chat/Chat";
import Notifications from "../pages/Notifications/Notifications";
import MyAccount from "../pages/MyAccount/MyAccount";
import Upload from "../pages/Upload/Upload";

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
      {
        path: "/home/profile",
        element: <Profile />,
      },
      {
        path: "/home/upload",
        element: <Upload />,
      },
      {
        path: "/home/notification",
        element: <Notifications />,
      },
      {
        path: "/home/chat",
        element: <Chat />,
      },
      {
        path: "/home/myAccount",
        element: <MyAccount />,
      },
    ],
  },
]);

export default router;
  