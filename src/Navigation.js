// src/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    const buttonStyle = {
        backgroundColor: '#0056b3', // Green
        color: 'white',
        padding: '10px 15px',
        margin: '5px',
        border: 'none',
        borderRadius: '5px',
        textDecoration: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
    };

    return (
        <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
            <Link to="/" style={buttonStyle}>Home</Link>
            <Link to="/analytics" style={buttonStyle}>Analytics</Link>
        </div>
    );
};

export default Navigation;
