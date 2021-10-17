import React, { useState } from 'react';
import QuestionTypes from '../QuestionTypes/QuestionTypes';

const SingleQuestionBuilder = (props) => {
    const [questionType, setQuestionType] = useState('multiple-choice');
    const [isSaved, setSaved] = useState(false);
    console.log( " and the " +
    JSON.stringify(props))

    return (
        <div style={{border: isSaved ? '1px solid green' : 'none', margin: 10, padding: 10}}>
            <div className='select-question-type-wrapper wrapper'>
                <form className='single-question-builder-form form' style={{justifyContent: 'space-around', alignItems: 'center', display: 'flex'}}>
                <label htmlFor='enter-answer'>question {props.num + 1}</label>
                    <div className='question-type-wrapper wrapper' style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <p style={{marginRight: 10}}>What style question?</p>
                        <select  id='survey-category' onChange={(e) => setQuestionType(e.target.value)}>
                            <option value='multiple-choice'>Multiple choice</option>
                            <option value='dropdown'>Dropdown</option>
                            <option value='checkboxes'>Checkboxes</option>
                            <option value='star-rating'>Star rating</option>
                            <option value='ranking'>Ranking</option>
                            <option value='file-upload'>File upload</option>
                            <option value='slider'>Slider</option>
                            <option value='single-textbox'>Single textbox</option>
                            <option value='multiple-textbox'>Multiple textbox</option>
                            <option value='comment-box'>Comment box</option>
                            <option value='contact-information'>Contact information</option>
                            <option value='matrix-of-dropdowns'>Matrix of dropdowns</option>
                            <option value='date-time'>Date time</option>
                        </select>
                    </div>
                </form>
                <div>
                    <QuestionTypes questionSaved={props.questionSaved} setQuestionSaved={props.setQuestionSaved} setSaved={setSaved} surveyId={props.surveyId} num={props.num} questionType={questionType} />
                </div>
                <div>
                    {isSaved ? "Saved" : "Not Saved"}
                </div>
            </div>
        </div>
    )
}

export default SingleQuestionBuilder;