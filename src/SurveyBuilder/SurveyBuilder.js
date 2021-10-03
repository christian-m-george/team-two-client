import React from 'react';
// import React, { useState } from 'react';
import Navigation from '../Navigation/Navigation.js'
import './SurveyBuilder.css'

export default function SurveyBuilder() {
    // const [surveyName, setSurveyName] = useState();
    // const [surveyCategory, setSurveyCategory] = useState();
    // const [surveyStyle, setSurveyStyle] = useState(false);
    // const [surveyRandom, setSurveyRandom] = useState(false);

    const submitSurveyWizardData = async (data) => {
        const arrayOfTargets = data.target;
        for(let i = 0 ; i < arrayOfTargets.length; i++) {
            console.log(arrayOfTargets[i]);
        }

        const surveyFormData = {
            title: data.target[0].value,
            category: data.target[1].value,
            singleQuestion: data.target[2].value === 'single questions' ? true : false,
            isPrivate: data.target[3] === 'checked' ? true : false,
            isRandom: data.target[5] === 'checked' ? true : false,
            numQuestions: data.target[7].value
        }

        const url = 'http://localhost:8000/survey';
    
        const options = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
          },
          body: JSON.stringify(
            {surveyFormData}
          ),
          credentials: 'include',
          cors: true
        };
        console.log(JSON.stringify(surveyFormData) + " THIS IS SURVEY FORM DATA");
        const response = await fetch(url, options)
          .then(res => res.json()
          ).catch(
              err => console.error(err)
          );
          console.log(response);
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
                        Is this survey private?
                        <div>
                            <label htmlFor='yes'>
                                    Yes
                                <input type='radio' value='true' name='options1' />
                            </label>
                            <label htmlFor='no'>
                                    No
                                <input type='radio'
                                value='false' name='options1' defaultChecked />
                            </label>
                        </div>
                    </div>
                    <div>
                        Should questions be randomized?
                        <div>
                            <label htmlFor='yes'>
                                    Yes
                                <input type='radio' value='true' name='options2' />
                            </label>
                            <label htmlFor='no'>
                                    No
                                <input type='radio'
                                value='false' name='options2' defaultChecked />
                            </label>
                        </div>
                    </div>
                    <div className='question-number-wrapper'>How many questions will there be? Up to 100
                        <div>
                            <input 
                            type='text' 
                            name='number-of-questions'
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                  event.preventDefault();
                                }
                              }}
                        />
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-default" type="submit" onClick={() => submitSurveyWizardData}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}