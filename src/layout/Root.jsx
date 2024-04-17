import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Loader from "../components/Loader/Loader"; // Importa el componente Loader

export default function Root() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        setTimeout(() => {
            setLoading(false);
        }, 2000); 
    }, []);

    return (
        <>
            <Header />
            {loading ? ( 
                <Loader />
            ) : (
                <Outlet />
            )}
        </>
    );
}
