import React from 'react';
import { Link } from 'react-router-dom';
import MySurveys from '../MySurveys/MySurveys.js'

export default function Navigation() {
    return <div>
        <Link to='/account-settings'>Account Settings</Link>
        <MySurveys>My Surveys</MySurveys>
       <button>Log Out</button>
    </div>
}