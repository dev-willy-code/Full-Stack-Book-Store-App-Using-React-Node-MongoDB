import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function AdminRoutes({ children }) {
    //aca solo se verifca que haiga token
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/admin" />
    }
    return children;
}

export default AdminRoutes
