// About.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

export const About = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    // Check if the user is not authenticated, redirect to login
    if (!token) {
        navigate('/login');
        return null;
    }

    return (
        <>
            You Are On The Grand About Page
        </>
    );
};
