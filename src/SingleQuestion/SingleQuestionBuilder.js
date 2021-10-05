import React, { useState } from 'react';
import QuestionTypes from '../QuestionTypes/QuestionTypes';


export default function SingleQuestionBuilder() {
    const [questionType, setQuestionType] = useState('multiple-choice');


    return (
        <div className='single-question-builder-wrapper wrapper'>
            <div className='select-question-type-wrapper wrapper'>
                <form className='single-question-builder-form form'>
                    <div className='question-type-wrapper wrapper'>
                        <p>What style question?</p>
                        <select id='survey-category' onChange={(e) => setQuestionType(e.target.value)}>
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
                    <QuestionTypes qType={questionType} />
                </div>
                <div>
                </div>
            </div>
        </div>
    )
}