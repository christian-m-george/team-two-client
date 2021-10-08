import React from 'react';
import SurveyWizard from './SurveyWizard';
import SingleQuestionBuilder from '../SingleQuestion/SingleQuestionBuilder.js';

export default function SurveyBuilder() {
    
    return (
    <div>
        <div className='survey-wizard-wrapper wrapper'>
            <div>
                <SurveyWizard>
                </SurveyWizard>
            </div>
        </div>
    </div>
    )
}