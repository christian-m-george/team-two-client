import React, { useState } from 'react';
import QuestionTypes from '../QuestionTypes/QuestionTypes';

const SingleQuestionBuilder = (props) => {
    const [questionType, setQuestionType] = useState('multiple-choice');
    const [isSaved, setSaved] = useState(false);
    console.log(" and the " +
        JSON.stringify(props))

    return (
        <div style={{ border: isSaved ? '5px solid green' : 'none', margin: 10, padding: 10, backgroundColor: isSaved ? "rgb(153, 255, 153)" : '#f2f2f2', borderRadius: 5, boxShadow: "0 1px 1px 0 black" }}>
            <div className='select-question-type-wrapper wrapper'>
                <form className='single-question-builder-form form' style={{ justifyContent: 'space-around', alignItems: 'center', display: 'flex' }}>
                    <label htmlFor='enter-answer'>question {props.num + 1}</label>
                    <div className='question-type-wrapper wrapper' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <p style={{ marginRight: 10 }}>What style question?</p>
                        <select id='survey-category' onChange={(e) => setQuestionType(e.target.value)}>
                            <option value='multiple-choice'>Multiple choice</option>
                            <option value='slider'>Slider</option>
                            <option value='comment-box'>Comment box</option>
                        </select>
                    </div>
                </form>
                <div>
                    <QuestionTypes questionSaved={props.questionSaved} setQuestionSaved={props.setQuestionSaved} setSaved={setSaved} surveyId={props.surveyId} num={props.num} questionType={questionType} />
                </div>
                <div style={{ padding: 10 }}>
                    {isSaved ? "Saved" : "Not Saved"}
                </div>
            </div>
        </div>
    )
}

export default SingleQuestionBuilder;