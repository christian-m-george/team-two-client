import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../Logout/Logout.js';

// Component that renders a  Navigation bar

export default function Navigation() {
    return (
        <div
            style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                marginBottom: 15,
                backgroundColor: 'green',
                color: 'white'
            }}
        >
            <div
                style={{ padding: 10 }}
            >
                <Link
                    style={{
                        color: 'white',
                        textDecoration: 'none'
                    }}
                    to='/account-settings'
                >
                    Account Settings
                </Link>
            </div>
            <div style={{ padding: 10 }} >
                <Link
                    style={{
                        color: 'white',
                        textDecoration: 'none'
                    }}
                    to='/'
                >
                    Home
                </Link>
            </div>

            <Logout />
        </div>)
}