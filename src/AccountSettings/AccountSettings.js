import React from 'react';
import Navigation from '../Navigation/Navigation';
import { Link } from 'react-router-dom';

export default function AccountSettings() {
    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Navigation />
            This is AccountSettings component
            <Link to='change-password' >Change your password here</Link>
            <Link to='delete-Account'>Delete Account here</Link>
        </div>
    )
}
