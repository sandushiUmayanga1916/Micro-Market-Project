import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";

import Signup from "../components/Signup";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import PrivateRouter from './../privateRouter/PrivateRouter';
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import Login from "../components/Login";
import AddMenu from "../pages/dashboard/admin/AddMenu";
import ManageItems from "../pages/dashboard/admin/ManageItems";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu";
import Payment from "../pages/menuPage/Payment";
import Menu from "../pages/menuPage/Menu";
import CartPage from "../pages/menuPage/CartPage";
import Order from "../pages/dashboard/Order";
import ManageOrderings from "../pages/dashboard/admin/ManageOrderings";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: (
          <Menu/>
        ),
      },
      {
        path: "/cart-page",
        element: (
          <CartPage/>
        ),
      },
      {
        path: "/update-profile",
        element: (
          <UpdateProfile/>
        ),
      },
      {
        path: "/order",
        element: <Order/>
      },
      {
        path: "process-checkout",
        element: <Payment/>
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },

  // admin routes
  {
    path: "dashboard",
    element: <PrivateRouter><DashboardLayout/></PrivateRouter>,
    children: [
      {
        path: '',
        element: <Dashboard/>
      },
      {
        path: 'users', 
        element: <Users/>
      },
      {
        path: 'add-menu', 
        element: <AddMenu/>
      },
      {
        path: 'manage-items',
        element: <ManageItems/>
      },
      {
        path: 'update-menu/:id',
        element: <UpdateMenu/>,
        loader: ({params}) => fetch(`http://localhost:5000/menu/${params.id}`)
      },
      {
        path: 'manage-ordering',
        element: <ManageOrderings/>
      }
    ]
  },
]);

export default router;
