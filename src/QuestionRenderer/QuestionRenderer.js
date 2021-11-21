import React from 'react';
import MultipleChoiceRenderer from './MultipleChoiceRenderer';
import CommentBoxRenderer from './CommentBoxRenderer';
import SliderRenderer from "./SliderRenderer";

const QuestionTypes = (props) => {
    const qType = props.question.questionType;
    // console.log(qType + " THIS IS QTYPE")
    // console.log(JSON.stringify(props));
    const questionType = (num, surveyId) => {
        switch(qType) {
            case 'multiple choice':
            return (<div>
                        <MultipleChoiceRenderer
                            answerArray={props.answerArray}
                            setUserAnswerArray={props.setUserAnswerArray}
                            question={props.question}
                            questionSaved={props.questionSaved}
                            setQuestionSaved={props.setQuestionSaved}
                            setSaved={props.setSaved} 
                            num={num}/>
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
            return (
                <div>
                    <SliderRenderer
                        answerArray={props.answerArray}
                        setUserAnswerArray={props.setUserAnswerArray}
                        question={props.question}
                        questionSaved={props.questionSaved}
                        setQuestionSaved={props.setQuestionSaved}
                        setSaved={props.setSaved}
                        num={num}
                    />
                </div>);
            case 'single-textbox':
            return (<div>single-textbox</div>);
            case 'multiple-textbox':
            return (<div>multiple-textbox</div>);
            case 'comment box':
            return (
                    <div>
                        <CommentBoxRenderer
                            answerArray={props.answerArray}
                            setUserAnswerArray={props.setUserAnswerArray} 
                            question={props.question} 
                            questionSaved={props.questionSaved} 
                            setQuestionSaved={props.setQuestionSaved} 
                            setSaved={props.setSaved} 
                            num={num}
                        />
                    </div>);
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


    return <div className='question-type-wrapper wrapper'>{questionType(props.question.order, props.question.surveyId)}</div>
}

export default QuestionTypes;