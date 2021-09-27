import React from 'react';
import Navigation from '../Navigation/Navigation';
import { Link } from 'react-router-dom';


export default function Home() {
    return <div className='home'>
        <div className='wrapper'>
            <Navigation></Navigation>
        </div>
        <div className='create-survey-wrapper wrapper'>
            <Link to='/create-survey'>Create Survey</Link>
        </div>
        <div className='create-survey-wrapper wrapper'>
            <Link to='/my-surveys'>My Surveys</Link>
        </div>
    </div>
}

