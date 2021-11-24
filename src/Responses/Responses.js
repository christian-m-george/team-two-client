import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { BarChart } from '../BarChart/BarChart';
import Navigation from '../Navigation/Navigation';

const Responses = () => {
    const history = useHistory();
    const [questions, setQuestions] = useState(null);
    const [responses, setResponses] = useState(null);
    const questionObject = history.location.state?.questions;
    const responseObject = history.location.state?.responses;

    useEffect(() => {
        setResponses(responseObject)
        setQuestions(questionObject)
    }, [])

    console.log("THIS IS QUESTION OBJ");
    console.log(questions);
    console.log("THIS IS RESPONSE OBJ");
    console.log(responses);

    if (questions !== null) {
        const sortedQuestions = questions.sort((a, b) => a.order > b.order ? 1 : -1);
        console.log(sortedQuestions);
    }

    const times = (date) => {
        const a = new Date(date);
        const b = a.toLocaleDateString();
        const c = a.toLocaleTimeString();
        return b + " " + c
    }
    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Navigation />

            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                {responses ? <h5>your survey has been taken {responses.length} times</h5> : null}
                <button onClick={() => history.goBack()}>back to your surveys</button>
            </div>

            <ul style={{ listStyle: 'none', paddingInlineStart: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {questions ? questions.map
                    ((question, idx) =>
                        <li
                            key={idx}
                            style={{
                                width: '70%',
                                border: "1px solid black",
                                margin: 20,
                                padding: 20
                            }}
                        >
                            <div style={{ margin: 5, padding: 5, fontSize: "2vw" }}>
                                created: {times(question.createdAt)} updated: {times(question.updatedAt)}
                            </div>
                            <div style={{ margin: 5, padding: 5 }}>
                                {question.questionType}</div>
                            <div style={{ margin: 5, padding: 5 }}>
                                <h3 style={{ fontSize: "5vw" }}>{question.questionText}</h3>
                            </div>
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                {question.answers.length >= 1 ? <div>Answers</div> : null}
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                    {question.answers ? question.answers.map((answer, idx) => <div
                                        style={{
                                            marginTop: 20,
                                            width: "100%",
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-evenly',
                                            alignItems: 'center'
                                        }}><div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                            Answer {idx}:
                                            <div style={{ margin: 5, padding: 5 }}>
                                                {answer}
                                            </div>
                                        </div>
                                    </div>) : null}
                                </div>

                                {question.questionType === 'multiple choice' ? <BarChart data={{
                                    labels: question.answers,
                                    responses: [...responses.map((a) => a[idx])]
                                }} /> : null}



                                <div style={{ marginTop: 20, width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                    <div>Responses</div>
                                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                        {responses.map((a, num) => <div style={{ margin: 10, padding: 10 }}>{num + 1}: {a[idx]} </div>)}
                                    </div>
                                </div>
                            </div>


                        </li>)
                    : <div>no questions</div>}
            </ul>
        </div>
    )
}

export default Responses
