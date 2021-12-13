import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import validate from '../Utils/Validate';
import Navigation from '../Navigation/Navigation.js'

// Component that makes call to change survey status to published and allows two 
// methods of distributing the surveys to survey takers
const PublishSurvey = () => {
    const [emailField, setEmailField] = useState([0, 1]);
    const [emailFieldInputs, setEmailFieldInputs] = useState(["", ""]);
    const [error, setError] = useState(null);
    const [sent, setSent] = useState(false);
    const history = useHistory();

    console.log(JSON.stringify(history.location.state) + " HERERERERE");

    const surveyId = history.location.state?.surveyId;
    const survey = history.location.state?.survey;

    const url = process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_HEROKU}` : `${process.env.REACT_APP_LOCAL}`;
    const options = {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
            id: surveyId,
            emails: emailFieldInputs
        }),
        credentials: 'include',
        cors: true
    }

    const nextNum = () => {
        const num = emailField[emailField.length - 1]
        return num + 1;
    }


    const allEmailsValid = () => {
        let i = 0;
        let allValid = true
        while (allValid && i < emailFieldInputs.length) {
            console.log(`is ${emailFieldInputs[i]} valid?` + validate.email(emailFieldInputs[i]))
            if (!validate.email(emailFieldInputs[i])) {
                allValid = false;
                return false
            }
            i++
        }
        return allValid;
    }

    const submitSurvey = (recpt) => {
        console.log('runn')
        let url2 = recpt ? `${url}/survey/publish-survey` : `${url}/survey/get-survey-link`;
        fetch(url2, options).then(
            res => {
                console.log(res.status + ' is status')
                if (res.status === 200) {
                    console.log('sent survey to recipients')
                    setSent("Your survey was sent")
                } else {
                    setError('could not send your survey, please try again later')
                }
            }
        )
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100%", flexDirection: 'column' }}>
            <Navigation />
            <button style={{ padding: 5, margin: 10 }} onClick={() => history.goBack()}>back to your surveys</button>
            <div style={{ margin: 20, padding: 15, border: "1px solid black", borderRadius: 3, boxShadow: "1px 1px 0 0 black", textAlign: "center", display: "flex", flexDirection: "column" }}>Publish your survey
                <button
                    style={{ width: "50%", margin: "5px auto 25px auto" }}
                    onClick={() => {
                        history.push({
                            pathname: '/edit-survey',
                            state: {
                                survey: survey,
                                surveyId: surveyId
                            }
                        })
                    }}>you can still review/edit it</button>
                {sent ? <div>Your survey was sent!</div> : null}

                <div style={{ width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <form style={{ width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: 12 }}>Please enter the emails to which you wish to send a link</p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <button
                                style={{ margin: 10 }}
                                onClick={(event) => {
                                    event.preventDefault();
                                    const nxt = nextNum();
                                    setEmailField([...emailField, nxt])
                                    setEmailFieldInputs([...emailFieldInputs, ""])
                                }}
                            >add email field
                            </button>

                            <button
                                onClick={(event) => {
                                    event.preventDefault();
                                    if (emailField.length > 1) {
                                        setEmailField(emailField.slice(0, emailField.length - 1))
                                        setEmailFieldInputs(emailFieldInputs.slice(0, emailFieldInputs.length - 1))
                                    }
                                }}>
                                remove email field
                            </button>

                        </div >
                        <ul style={{ width: "100%", listStyle: 'none', paddingInlineStart: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                            {emailField.map((num) => <input key={num}
                                style={{
                                    width: "75%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center',
                                    margin: 5, padding: 5
                                }}
                                type='text' maxLength={45}
                                onChange={(event) => {
                                    const markers = emailFieldInputs.map((a, idx) => {
                                        if (idx !== num) {
                                            return a;
                                        } else {
                                            a = event.target.value;
                                            return a;
                                        }
                                    });
                                    setEmailFieldInputs(markers);
                                    setError(null);
                                }}
                            />
                            )}
                        </ul>
                        {error ? <div style={{ textAlign: "center", fontSize: 12, color: "red" }}>{error}</div> : null}
                        <button
                            style={{ margin: 10 }}
                            type='submit'
                            onClick={(event) => {
                                event.preventDefault()
                                if (allEmailsValid()) {
                                    submitSurvey(true);
                                } else {
                                    setError("One or more of these emails is invalid")
                                }
                            }}
                        >Submit survey to recipients
                        </button>

                    </form>
                    <form
                        style={{
                            margin: 20,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "75%"
                        }}
                    >
                        Or you can receive a sharable link to your email
                        <button style={{
                            marginLeft: 20
                        }}
                            onClick={(e) => { e.preventDefault(); submitSurvey(false) }}>Email me a link i can share!</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PublishSurvey;