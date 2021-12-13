import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Navigation from '../Navigation/Navigation.js'
import SingleQuestionBuilder from '../SingleQuestion/SingleQuestionBuilder.js';

const SurveyWizard = () => {
    const [isPrivate, setIsPrivate] = useState(false);
    const [isRandom, setIsRandom] = useState(false);
    const [reqIdentifiers, setReqIdentifiers] = useState(false);
    const [numOfQuestions, setNumOfQuestions] = useState(10);
    const [surveyName, setSurveyName] = useState('');
    const [surveyCategory, setSurveyCategory] = useState('community feedback');
    const [surveyStyle, setSurveyStyle] = useState(true);
    const [surveyId, setSurveyId] = useState();
    const [questionsHidden, setQuestionsHidden] = useState(true);
    const [questionSaved, setQuestionSaved] = useState(0);
    const history = useHistory();
    const url = process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_HEROKU}` : `${process.env.REACT_APP_LOCAL}`;



    const submitSurveyWizardData = async () => {
        const surveyFormData = {
            title: surveyName,
            category: surveyCategory,
            singleQuestion: surveyStyle,
            isPrivate: isPrivate,
            isRandom: isRandom,
            requiresIdentifiers: reqIdentifiers,
            numQuestions: numOfQuestions >= 100 ? 10 : numOfQuestions
        }

        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(
                { surveyFormData }
            ),
            credentials: 'include',
            cors: true
        };

        const response = await fetch(`${url}/survey`, options)
            .then(res => {
                if (res.status === 200) {
                    res.json().then(data => {
                        setSurveyId(data.id);
                        setQuestionsHidden(false);
                    }).catch(err => console.log(err))
                } else if (res.status === 401) {
                    history.push('/entrance')
                }
            }
            ).catch(
                err => console.log(err)
            );

        return response;
    }

    const questionBuilders = (data) => {

        const builderArray = [];
        for (let i = 0; i < data; i++) {
            builderArray.push(i);
        }
        const questions = builderArray.map((num) =>

            <li key={num}>
                <SingleQuestionBuilder questionSaved={questionSaved} setQuestionSaved={setQuestionSaved} surveyId={surveyId} num={num} />
            </li>
        )
        return (
            <ul style={{ listStyle: 'none', paddingInlineStart: 0 }}>{questions}</ul>
        )
    }

    const number = parseInt(numOfQuestions);
    // console.log(typeof numOfQuestions + " " + typeof questionSaved);
    // console.log(parseInt(numOfQuestions));
    // console.log(questionSaved);

    return (
        <div>
            <Navigation></Navigation>
            <div className='survey-wizard-wrapper wrapper' hidden={!questionsHidden}>
                <div>
                    <form className='survey-wizard' onSubmit={(event) => {
                        event.preventDefault();
                        submitSurveyWizardData(event)
                    }}
                        style={{ padding: 10, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", border: "1px solid black", borderRadius: 3, boxShadow: "1px 1px 0 0 black" }}
                    >
                        <label style={{ padding: 10, fontWeight: "bold" }} htmlFor='name-your-survey'>Name your survey</label>
                        <input type='text' onChange={(event) => setSurveyName(event.target.value)} />
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <h5 style={{ marginRight: 10 }}>Survey Category</h5>
                            <select style={{ height: "30%" }} id='survey-category' onChange={(event) => setSurveyCategory(event.target.value)}>
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
                        </div>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <h5 style={{ marginRight: 10 }}>survey style</h5>
                            <select id='survey-style' onChange={() => {
                                if (surveyStyle) {
                                    setSurveyStyle(false);
                                } else {
                                    setSurveyStyle(true);
                                }
                                console.log(surveyStyle + " THIS IS SURVEY STYLE");
                            }}>
                                <option value='single questions'>one question at a time</option>
                                <option value='all questions'>all questions are visible</option>
                            </select>
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginRight: 10 }}>
                            <h5 style={{ marginRight: 10 }}>
                                Is this survey private?
                            </h5>
                            <div>
                                <label htmlFor='yes'>
                                    Yes
                                    <input type='radio' value='true' name='options1' onClick={() => setIsPrivate(true)} />
                                </label>
                                <label htmlFor='no'>
                                    No
                                    <input type='radio'
                                        value='false' name='options1' defaultChecked onClick={() => setIsPrivate(false)} />
                                </label>
                            </div>
                        </div>
                        <div style={styles.radioWrap}>
                            <h5 style={{ marginRight: 10 }}>
                                Does this survey require identifiers?
                            </h5>
                            <div>
                                <label htmlFor='yes'>
                                    Yes
                                    <input type='radio' value='true' name='options3' onClick={() => setReqIdentifiers(true)} />
                                </label>
                                <label htmlFor='no'>
                                    No
                                    <input type='radio'
                                        value='false' name='options3' defaultChecked onClick={() => setReqIdentifiers(false)} />
                                </label>
                            </div>
                        </div>
                        <div style={styles.radioWrap}>
                            <h5 style={{ marginRight: 10 }}>
                                Should questions be randomized?
                            </h5>
                            <div>
                                <label htmlFor='yes'>
                                    Yes
                                    <input type='radio' value='true' name='options2' onClick={() => setIsRandom(true)} />
                                </label>
                                <label htmlFor='no'>
                                    No
                                    <input type='radio'
                                        value='false' name='options2' defaultChecked onClick={() => setIsRandom(false)} />
                                </label>
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} className='question-number-wrapper'>
                            <h5 style={{ marginRight: 10 }}>
                                How many questions will there be? Up to 20
                            </h5>
                            <div >
                                <input
                                    type='number'
                                    name='number-of-questions'
                                    defaultValue={numOfQuestions}
                                    max={20}
                                    onChange={(event) => {
                                        setNumOfQuestions(event.target.value)
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <button style={{ marginTop: 10 }} className="btn btn-default" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div style={{ marginLeft: "auto", marginRight: "auto", width: "50%", textAlign: "center" }} hidden={questionsHidden}>{surveyName}: {questionSaved}/{numOfQuestions} Questions saved</div>
            <div hidden={questionsHidden}>
                {questionBuilders(numOfQuestions)}
            </div>
            {questionSaved === number ? <div style={{ padding: 20, display: questionsHidden ? "none" : "flex", alignItems: "center", justifyContent: "center" }}>
                <button style={{
                    marginLeft: "auto",
                    marginRight: "auto"
                }}
                    onClick={() => {
                        history.push({
                            pathname: "/publish-survey/",
                            state: {
                                surveyId: surveyId
                            }
                        })
                    }}>Publish your survey</button>
            </div> : <div style={{ padding: 20, textAlign: "center", display: questionsHidden ? "none" : "", marginLeft: "auto", marginRight: "auto", }}>Please fill out all questions</div>}
        </div>
    )
}

const styles = {
    radioWrap: { display: "flex", justifyContent: "center", alignItems: "center", marginRight: 10 }
}

export default SurveyWizard;