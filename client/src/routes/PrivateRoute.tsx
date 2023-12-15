import { Navigate, useLocation } from "react-router-dom";
import React from "react";
import { useGlobalState } from "../context/GlobalContext";

const PrivateRoute: React.FC<any> = ({ children }) => {
    const location = useLocation();
    const { isAuthenticated } = useGlobalState();

    if (!isAuthenticated) {
        return <Navigate to={`/login?redirect=${location.pathname}${location.search}`} replace />;
    }

    return children;
};

export default PrivateRoute;