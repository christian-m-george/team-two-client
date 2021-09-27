import React from 'react';
import Navigation from '../Navigation/Navigation';
import { Link } from 'react-router-dom';

export default function CreateSurvey() {
    return (
    <div>
        <Navigation></Navigation>
        <div><Link to='/survey-builder'>Create a survey from scratch</Link></div>
        <div><Link to='/import-survey'>Import questions</Link></div>
        <div><Link to='/survey-templates'>Create a survey with templates</Link></div>
        <div><Link to='/copy-survey'>Copy a past survey</Link></div>
    </div>
    )
}