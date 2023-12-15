import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useGlobalState } from '../context/GlobalContext';

const Home = () => {
    const location = useLocation();
    const { isAuthenticated } = useGlobalState();

    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
    }else{
        return <Navigate to={"/files"} />;
    }
}

export default Home