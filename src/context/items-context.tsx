import { get } from "@/config/axios.config";
import React, { createContext, useEffect, useState } from "react";

export const ItemsContext = createContext({});

export const ItemsProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {


    const [data, setData] = useState<any>();
    const [isLoading, setIsLoading] = useState(true);

    const getItems = async () => {
        try {
            const response = await get('/check') as any
            setData(response.data.detail)
        } catch (exception) {
            console.error("Error fetching user:", exception);
        }
        finally {
            setIsLoading(false)
        }
    }


    useEffect(() => {
        getItems()
    }, [])




    if (isLoading)
        return (
            <>
            </>

        );


    return (<>

        <ItemsContext.Provider
            value={{
                items: data || null,
                setItems: setData
            }}>
            {children}

        </ItemsContext.Provider>
    </>)
}

