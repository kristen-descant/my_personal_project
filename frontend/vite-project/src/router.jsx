import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import PortfolioPage from "./pages/PorfolioPage";
import SignupPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import PropertyOverviewPage from "./pages/PropertyOverviewPage";
import AddPropertyPage from "./pages/AddPropertyPage";
import ListsPropertiesPage from "./pages/ListsPropertiesPage";
import AListPropertiesPage from "./pages/AListPropertiesPage";
import PurchaseWorksheetPage from "./pages/PurchaseWorksheetPage";
import CaclculatorPage from "./pages/CalculatorPage";
import UserSettingsPage from "./pages/UserSettingsPage";

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
      {
        path: "portfolio",
        element: <PortfolioPage/>
      },
      {
        path: "property/:propertyId",
        element: <PropertyOverviewPage/>
      },
      {
        path: "addproperty",
        element: <AddPropertyPage/>
      },
      {
        path: "lists",
        element: <ListsPropertiesPage/>
      },
      {
        path: "lists/:listId",
        element: <AListPropertiesPage/>
      },
      {
        path: "purchaseworksheet/:propertyId",
        element: <PurchaseWorksheetPage/>
      },
      {
        path: "calculator",
        element: <CaclculatorPage/>
      },
      {
        path: "settings",
        element: <UserSettingsPage/>
      }
    ],
  },
]);

export default router;