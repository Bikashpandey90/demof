import { get } from "@/config/axios.config";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {


    const [data, setData] = useState<any>();
    const [isLoading, setIsLoading] = useState(true);

    const getLoggedInUser = async () => {
        try {
            const token = localStorage.getItem('token') || null;
            if (token) {


                const response = await get('/auth/me', {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem('token')
                    }
                }) as any

                setData(response.data.detail)

            }

        } catch (exception) {
            console.error("Error fetching user:", exception);
        }

        finally {
            setIsLoading(false)
        }
    }


    useEffect(() => {
        getLoggedInUser()
    }, [])




    if (isLoading)
        return (
            <>
            </>

        );


    return (<>

        <AuthContext.Provider
            value={{
                loggedInUser: data || null,
                setLoggedInUser: setData
            }}>
            {children}

        </AuthContext.Provider>
    </>)
}

