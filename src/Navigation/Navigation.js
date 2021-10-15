import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../Logout/Logout.js';

export default function Navigation() {
    return <div className='nav-wrapper' style={{display: 'flex', width:'100%', justifyContent: 'space-evenly', margin: 15}}>
        <Link to='/account-settings'>Account Settings</Link>
        <Link to='/'>Home</Link>
       <Logout />
    </div>
}