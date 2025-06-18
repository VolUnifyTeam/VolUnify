import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import Dashboard from "./Components/Dashboard";
import OrgCreate from "./Components/OrgCreate";
import OrgSearch from "./Components/OrgSearch";
import PrivateRoute from "./Components/PrivateRoute";
import OrgInfo from "./Components/OrgInfo";
import OrgAddPage from "./Components/OrgAddPage";
import OrgEditPage from "./Components/OrgEditPage";
import OrgSettings from "./Components/OrgSettings";
import LandingPage from "./Components/LandingPage";

export const router = createBrowserRouter([
  { 
    path: "/", 
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> }, // Default route
      { path: "signup", element: <Signup /> },
      { path: "signin", element: <Signin /> },
      { path: "orgSearch", element: <OrgSearch /> },
      { path: "orgInfo", element: <OrgInfo /> },
      
      // Protected routes
      { 
        path: "edit-activity/:activityId", 
        element: (
          <PrivateRoute>
            <OrgEditPage />
          </PrivateRoute>
        ) 
      },
      { 
        path: "orgcreate", 
        element: (
          <PrivateRoute>
            <OrgCreate />
          </PrivateRoute>
        )
      },
      {
        path: "orgsettings",
        element: (
          <PrivateRoute>
            <OrgSettings />
          </PrivateRoute>
        )
      },
      { 
        path: "orgaddpage", 
        element: (
          <PrivateRoute>
            <OrgAddPage />
          </PrivateRoute>
        )
      },
      { 
        path: "dashboard", 
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        )
      }
    ]
  }
]);