import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({ component: Component }) {
    const location = useLocation();
    if(!localStorage.getItem('token')) {
        return <Navigate to="/login" state={{ from: location }} replace />
    } else {
        return <Component />;
    }
}

export default PrivateRoute;