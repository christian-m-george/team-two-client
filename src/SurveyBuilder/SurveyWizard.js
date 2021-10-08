import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Navigation from '../Navigation/Navigation.js'
import SingleQuestionBuilder from '../SingleQuestion/SingleQuestionBuilder.js';
import './SurveyWizard.css'

 const SurveyWizard = () => {
    const [isPrivate, setIsPrivate] = useState(false);
    const [isRandom, setIsRandom] = useState(false);
    const [numOfQuestions, setNumOfQuestions] = useState(10);
    const [surveyName, setSurveyName] = useState('');
    const [surveyCategory, setSurveyCategory] = useState('community feedback');
    const [surveyStyle, setSurveyStyle] = useState(true);
    const [surveyId, setSurveyId] = useState();
    const [questionsHidden, setQuestionsHidden] = useState(true);
    const history = useHistory();

    const submitSurveyWizardData = async () => {
        const surveyFormData = {
            title: surveyName,
            category: surveyCategory,
            singleQuestion: surveyStyle,
            isPrivate: isPrivate,
            isRandom: isRandom,
            numQuestions: numOfQuestions >= 100 ? 10 : numOfQuestions
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
        // console.log(JSON.stringify(surveyFormData) + " THIS IS SURVEY FORM DATA");
        const response = await fetch(url, options)
          .then(res => {
            if(res.status === 200) {
                res.json().then(data => {
                    setSurveyId(data.id);
                    setQuestionsHidden(false);
                }).catch(err => {throw new Error(err)})
            } else if (res.status === 401) {
                history.push('/login')
            }
        }
          ).catch(
              err => {throw new Error(err)
        });

        return response;
    }
    
    const questionBuilders = (data) => {

        const builderArray = [];
        for(let i = 0; i < data; i++) {
            builderArray.push(i);
        }
        // console.log(builderArray);
        const questions = builderArray.map((num) => 
               
                <li key={num}>
                    <label htmlFor='enter-answer' style={{height: 100, width: 20}}>question {num + 1}</label>
                    <SingleQuestionBuilder surveyId={surveyId} num={num}/>
                </li>
        )
        return (
            <ul style={{listStyle: 'none', paddingInlineStart: 0}}>{questions}</ul>
        )
    }

    return (
    <div>
        <Navigation></Navigation>
        <div className='survey-wizard-wrapper wrapper' hidden={!questionsHidden}>
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
                    <select id='survey-style' onChange={() => {
                        if(surveyStyle) {
                            setSurveyStyle(false);
                        } else {
                            setSurveyStyle(true);
                        }
                        console.log(surveyStyle + " THIS IS SURVEY STYLE");
                        }}>
                        <option value='single questions'>one question at a time</option>
                        <option value='all questions'>all questions are visible</option>
                    </select>
                    <div>
                        Is this survey private?
                        <div>
                            <label htmlFor='yes'>
                                    Yes
                                <input type='radio' value='true'  name='options1' onClick={() => setIsPrivate(true)}/>
                            </label>
                            <label htmlFor='no'>
                                    No
                                <input type='radio'
                                value='false' name='options1' defaultChecked onClick={() => setIsPrivate(false)}/>
                            </label>
                        </div>
                    </div>
                    <div>
                        Should questions be randomized?
                        <div>
                            <label htmlFor='yes'>
                                    Yes
                                <input type='radio' value='true' name='options2' onClick={() => setIsRandom(true)}/> 
                            </label>
                            <label htmlFor='no'>
                                    No
                                <input type='radio'
                                value='false' name='options2' defaultChecked onClick={() => setIsRandom(false)}/>
                            </label>
                        </div>
                    </div>
                    <div className='question-number-wrapper'>How many questions will there be? Up to 99
                        <div>
                            <input 
                                type='number' 
                                name='number-of-questions'
                                defaultValue={numOfQuestions}
                                onChange={(event) => {
                                   setNumOfQuestions(event.target.value)
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
                <div hidden={questionsHidden}>
                    {questionBuilders(numOfQuestions)}
                </div>
    </div>
    )
}

export default SurveyWizard;