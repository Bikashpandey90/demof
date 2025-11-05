import { AuthProvider } from "@/context/auth-context";
import { FC, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Home from "@/pages/home/home";

const Routing: FC = () => {
    const router = createBrowserRouter([
        {
            path: "",
            index: true,
            element: <Home />
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