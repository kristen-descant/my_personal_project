import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import PortfolioPage from "./pages/PorfolioPage";
import SignupPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
// import HomePage from "./components/HomePage";
// import AboutPage from "./components/AboutPage";
// import ContactUsPage from "./components/ContactUsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <PortfolioPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);

export default router;