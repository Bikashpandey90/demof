import { AuthProvider } from "@/context/auth-context";
import { FC, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Home from "@/pages/home/home";
import ProductPage from "@/pages/product/product";
import MasterLayout from "@/pages/admin/adminPage";
import Dashboard from "@/pages/admin/dashboard";
import AddProduct from "@/pages/admin/addProduct";
import Login from "@/pages/login";
import CategoryForm from "@/pages/admin/addCategory";
import ProductList from "@/pages/admin/productList";
import CategoryList from "@/pages/admin/categoryList";
import PermissionCheck from "./permission.config";

const Routing: FC = () => {
    const router = createBrowserRouter([
        {
            index: true,
            path: "",
            element: <Home />
        }, {
            path: '/products/:slug',
            element: <ProductPage />
        }, {
            path: '/login',
            element: <Login />
        },
        {
            path: '/admin',
            element:

                <PermissionCheck allowedRole="admin"><MasterLayout /></PermissionCheck>,
            children: [
                {
                    index: true,
                    element: <Dashboard />,
                }, {

                    path: 'product',
                    element: <AddProduct />
                }, {
                    path: 'category',
                    element: <CategoryForm />
                }, {
                    path: 'products',
                    element: <ProductList />
                }, {
                    path: 'categories',
                    element: <CategoryList />
                }
            ]
        }

    ]);
    const [queryClient] = useState(() => new QueryClient());
    return <>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </QueryClientProvider>
    </>;
}

export default Routing;