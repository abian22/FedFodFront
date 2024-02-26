import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage"
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";


const router = createBrowserRouter([
    {
        path:"/",
        element: <LandingPage/>
    },
    {
        path:"/login",
        element: <Login/>
    },
    {
        path:"/signUp",
        element: <SignUp/>
    }

])

export default router;
