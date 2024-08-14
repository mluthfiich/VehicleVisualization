import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRouted = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('Bearer ');

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default AuthRouted;