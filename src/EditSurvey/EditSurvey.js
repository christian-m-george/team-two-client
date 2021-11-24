import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Navigation from '../Navigation/Navigation';
import SingleQuestionEditor from '../SingleQuestion/SingleQuestionEditor';

//  Component that allows user to edit a survey of their own creation that already exists

const EditSurvey = () => {
    const history = useHistory();
    const survey = history.location.state?.survey;
    const url = process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_HEROKU}/question/${survey.id}` : `${process.env.REACT_APP_LOCAL}/question/${survey.id}`;
    const [questions, setQuestions] = useState([]);
    const [questionSaved, setQuestionSaved] = useState(false);
    const [error, setError] = useState(null);




    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        },
        credentials: 'include',
        cors: true
    };

    useEffect(async () => {
        await fetch(url, options).then(res => {
            console.log(res.status);
            if (res.status === 200) {
                console.log(200);
                res.json().then(data => {
                    setQuestions(data);
                }).catch(error => console.log(error))
            } else {
                setError(res.statusText)
            }
        }).catch(err => {
            console.log(err.message);
        });
    }, [])

    const questionBuilders = (data) => {

        const builderArray = [];
        for (let i = 0; i < data; i++) {
            builderArray.push(i);
        }
        const questionEditor = builderArray.map((num) =>
            <li key={num}>
                <SingleQuestionEditor question={questions[num]} />
            </li>
        )
        return (
            <ul style={{ listStyle: 'none', paddingInlineStart: 0 }}>{questionEditor}</ul>
        )
    }

    if (survey) return (
        <div>
            <Navigation />
            <button style={{ padding: 5, margin: 10 }} onClick={() => history.push('/my-surveys')}>back to your surveys</button>
            <form style={{ textAlign: "center", width: "100%", marginLeft: "auto", marginRight: "auto" }}>
                <div><h2>{survey.title}</h2></div>
                <div>{`${survey.singleQuestion}`}</div>
                <div>{`${survey.isPrivate}`}</div>
                <div>{`${survey.isRandom}`}</div>
                <div>{survey.numQuestions}</div>
            </form>
            <div style={{ textAlign: "center", width: "100%", marginLeft: "auto", marginRight: "auto" }}>
                <h3>questions</h3>
                <div>
                    {questions ? questionBuilders(questions.length) : null}
                </div>
            </div>
        </div>)
    else {
        return <div>no survey yet</div>
    }
}

export default EditSurvey;