import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/Register";
import CheckPassword from "../pages/CheckPassword";
import Home from "../pages/Home";
import Message from "../components/Message";
import AuthLayout from "../layout";
import Login from "../pages/Login";
import Forgotpassword from "../pages/Forgotpassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "register",
        element: (
          <AuthLayout>
            <Register />
          </AuthLayout>
        ),
      },
      {
        path: "login",
        element: (
          <AuthLayout>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "password",
        element: (
          <AuthLayout>
            <CheckPassword />
          </AuthLayout>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <AuthLayout>
            <Forgotpassword />
          </AuthLayout>
        ),
      },

      {
        path: "",
        element: <Home />,
        children: [{ path: ":userId", element: <Message /> }],
      },
      {
        path: "*",
        element: (
          <div className="flex items-center justify-center">Page not found</div>
        ),
      },
    ],
  },
]);

export default router;
