import React from 'react';
import MultipleChoice from './MultipleChoice';
import CommentBox from './CommentBox';
import Slider from './Slider';

const QuestionTypes = (props) => {
    console.log(JSON.stringify(props));
    const questionType = (num, surveyId) => {
        switch(props.questionType) {
            case 'multiple-choice':
            return (<div>
                        <MultipleChoice questionSaved={props.questionSaved} setQuestionSaved={props.setQuestionSaved} setSaved={props.setSaved} num={num} surveyId={surveyId}/>
                    </div>);
            case 'dropdown':
            return (<div>dropdown</div>);
            case 'checkboxes':
            return (<div>checkboxes</div>);
            case 'star-rating':
            return (<div>star-rating</div>);
            case 'ranking':
            return (<div>ranking</div>);
            case 'file-upload':
            return (<div>file-upload</div>);
            case 'slider':
            return (<div><Slider questionSaved={props.questionSaved} setQuestionSaved={props.setQuestionSaved} setSaved={props.setSaved} num={num} surveyId={surveyId}/></div>);
            case 'single-textbox':
            return (<div>single-textbox</div>);
            case 'multiple-textbox':
            return (<div>multiple-textbox</div>);
            case 'comment-box':
            return (<div><CommentBox questionSaved={props.questionSaved} setQuestionSaved={props.setQuestionSaved} setSaved={props.setSaved} num={num} surveyId={surveyId}/></div>);
            case 'contact-information':
            return (<div>contact-information</div>);
            case 'matrix-of-dropdowns':
            return (<div>matrix-of-dropdowns</div>);
            case 'date-time':
            return (<div>date-time</div>);
            default:
            return (<div>default</div>)
         }
    }

    return (
    <div className='question-type-wrapper' style={{width: '100%'}}>
        {questionType(props.num, props.surveyId)}
    </div>
)}

export default QuestionTypes;