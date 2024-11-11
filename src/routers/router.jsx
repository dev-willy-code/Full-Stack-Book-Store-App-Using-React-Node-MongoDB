import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/books/CartPage";
import Checkout from "../pages/books/Checkout";
import SingleBook from "../pages/books/SingleBook";
import PrivateRoutes from "./PrivateRoutes";
import OrderPage from "../pages/books/OrderPage";
import AdminRoutes from "./AdminRoutes";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard"
import ManageBooks from "../pages/dashboard/manageBooks/ManageBooks";
import AddBook from "../pages/dashboard/addBook/AddBook";
import UpdateBook from "../pages/dashboard/EditBook/UpdateBook";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/orders",
                element: <PrivateRoutes><OrderPage /></PrivateRoutes>
            },
            {
                path: "/about",
                element: <div>About</div>
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/cart",
                element: <CartPage />
            },
            {
                path: "/checkout",
                element: <PrivateRoutes><Checkout /></PrivateRoutes>
            },
            {
                path: "/books/:id",
                element: <SingleBook />
            }
        ]
    },
    {
        path: "/admin",
        element: <AdminLogin />,
    },
    {
        path: "/dashboard",
        element: <AdminRoutes> <DashboardLayout /> </AdminRoutes>,
        children: [
            {
                path: "",
                element: <Dashboard />
            },
            {
                path: "add-new-book",
                element: <AddBook />
            },
            {
                path: "edit-book/:id",
                element: <UpdateBook />
            },
            {
                path: "manage-books",
                element: <ManageBooks />
            }
        ]
    }
]);

export default router;