import React, { useState } from 'react';
import Navigation from '../Navigation/Navigation.js'
import './SurveyBuilder.css'

export default function SurveyBuilder() {
    const [isPrivate, setIsPrivate] = useState(true);
    const [isRandom, setIsRandom] = useState(false);
    const [numOfQuestions, setNumOfQuestions] = useState();
    const [surveyName, setSurveyName] = useState('');
    const [surveyCategory, setSurveyCategory] = useState('community feedback');
    const [surveyStyle, setSurveyStyle] = useState(false);

    const toggleIsPrivate = () => {
        if (isPrivate) setIsPrivate(false);
        else setIsPrivate(true);
    }
    const toggleIsRandom = () => {
        if (isRandom) setIsRandom(false);
        else setIsRandom(true);
    }

    const submitSurveyWizardData = async () => {
        const surveyFormData = {
            title: surveyName,
            category: surveyCategory,
            singleQuestion: surveyStyle === 'single questions' ? true : false,
            isPrivate: isPrivate,
            isRandom: isRandom,
            numQuestions: numOfQuestions
        }
        
        console.log(surveyFormData);
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
                    <input type='text' onChange={(event) => setSurveyName(event.target.value)}/>
                    <h5>survey category</h5>
                    <select id='survey-category' onChange={(event) => setSurveyCategory(event.target.value)}>
                        <option value='community feedback'>Community or volunteer feedback</option>
                        <option value='customer feedback'>Customer feedback</option>
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
                    <select id='survey-style' onChange={(event) => setSurveyStyle(event.target.value)}>
                        <option value='single questions'>one question at a time</option>
                        <option value='all questions'>all questions are visible</option>
                    </select>
                    <div>
                        Is this survey private?
                        <div>
                            <label htmlFor='yes'>
                                    Yes
                                <input type='radio' value='true' defaultChecked name='options1' onClick={() => toggleIsPrivate()}/>
                            </label>
                            <label htmlFor='no'>
                                    No
                                <input type='radio'
                                value='false' name='options1' onClick={() => toggleIsPrivate()}/>
                            </label>
                        </div>
                    </div>
                    <div>
                        Should questions be randomized?
                        <div>
                            <label htmlFor='yes'>
                                    Yes
                                <input type='radio' value='true' name='options2' onClick={() => toggleIsRandom()}/> 
                            </label>
                            <label htmlFor='no'>
                                    No
                                <input type='radio'
                                value='false' name='options2' defaultChecked onClick={() => toggleIsRandom()}/>
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
                                    } else {
                                    setNumOfQuestions(event.target.value);
                                    }
                                }}
                             />
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