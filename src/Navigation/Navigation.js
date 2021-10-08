import React from 'react';
import { Link } from 'react-router-dom';
import MySurveys from '../MySurveys/MySurveys.js';

export default function Navigation() {
    return <div className='nav-wrapper' style={{display: 'flex', width:'100%', justifyContent: 'space-evenly', margin: 15}}>
        <Link to='/account-settings'>Account Settings</Link>
       <button>Log Out</button>
    </div>
}