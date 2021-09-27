import React, { useState } from 'react';
import Navigation from '../Navigation/Navigation.js'
import './SurveyBuilder.css'

export default function SurveyBuilder() {
    const [surveyName, setSurveyName] = useState();
    const [surveyCategory, setSurveyCategory] = useState();
    const [surveyStyle, setSurveyStyle] = useState(false);
    const [surveyRandom, setSurveyRandom] = useState(false);

    const submitSurveyWizardData = (data) => {
        console.log(data.target[0].value);
        console.log(data.target[1].value);
        console.log(data.target[2].value);
        console.log(data.target[3].value);
        console.log(data.target[4].value);
        console.log(data.target)
    }

    return (
    <div>
        <Navigation></Navigation>
        <div className='survey-wizard-wrapper wrapper'>
            <div>
                <form className='survey-wizard' onSubmit={(event) => {
                    event.preventDefault();
                    submitSurveyWizardData(event)
                }}>
                    <label htmlFor='name-your-survey'>name your survey</label>
                    <input type='text' />
                    <h5>survey category</h5>
                    <select id='survey-category'>
                        <option value='community feedback'>Community or volunteer feedback</option>
                        <option value='customre feedback'>Customer feedback</option>
                        <option value='concept testing'>Concept product or ad testing</option>
                        <option value='brand tracking'>Brand tracking or awareness</option>
                        <option value='market research'>General market research</option>
                        <option value='employee engagement'>Employee engagement</option>
                        <option value='employee performance'>Employee performance</option>
                        <option value='general employee feedback'>General employee feedback</option>
                        <option value='event registration'>Event registration</option>
                        <option value='event feedback'>Event feedback</option>
                        <option value='academic research'>Academic research</option>
                        <option value='course evaluation'>Course evaluation</option>
                        <option value='school feedback'>Student or parent feedback</option>
                        <option value='application form'>Form of application</option>
                        <option value='vote'>Vote</option>
                        <option value='poll'>Poll</option>
                        <option value='other'>Other</option>
                    </select>
                    <h5>survey style</h5>
                    <select id='survey-style'>
                        <option value='single questions'>one question at a time</option>
                        <option value='all questions'>all questions are visible</option>
                    </select>
                    <div>
                        Should questions be randomized?
                        <div>
                            <label htmlFor='yes'>
                                    Yes
                                <input type='radio' value='yes' name='yes' />
                            </label>
                            <label htmlFor='no'>
                                    No
                                <input type='radio'
                                value='no' name='no' defaultChecked />
                            </label>
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-default" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}