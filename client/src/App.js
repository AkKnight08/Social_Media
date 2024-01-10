import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Sign_In from "./pages/Sign_In";
import Sign_Up from "./pages/Sign_Up";
import ForgotPass from "./pages/ForgotPass";
import ResetPass from "./pages/ResetPass";
import Profile from "./pages/Profile";
import OtherProfile from "./pages/OtherProfile";
const App = () => {
  const routerProvider = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/sign-in",
          element: <Sign_In />,
        },
        {
          path: "/sign-up",
          element: <Sign_Up />,
        },
        {
          path: "/forget-pass",
          element: <ForgotPass />,
        },
        {
          path: "/reset-pass",
          element: <ResetPass />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        { path: "/other-profile/:userId", element: <OtherProfile /> },
      ],
    },
  ]);
  return (
    <>
      <>
        <RouterProvider router={routerProvider} />
      </>
    </>
  );
};

export default App;
