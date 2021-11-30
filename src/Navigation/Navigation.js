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

                backgroundColor: "#9dc5c3",
                backgroundImage: "linear-gradient(315deg, #9dc5c3 0%, #5e5c5c 74%)",

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