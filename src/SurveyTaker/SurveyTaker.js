import React from 'react';

const SurveyTaker = (props) => {

        return <div>
            <div>{props.survey.title} + this is survey title</div>
                <div>{props.survey.createdAt}</div>
                <ul style={{width: '100%', paddingInlineStart: 0, listStyle:'none', display: "flex-column", justifyContent: 'center', alignItems: 'center'}}>{(props.questions.length > 0) ?  props.questions.map(item => <li>
                    <div>{item.questionType}</div>
                    <div>{item.num}</div>
                    <div>{item.questionText}</div>
                    <div>
                        <ul>
                            {(item.answers.length > 0) ? item.answers.map((answer) => <li key={item.num} style={{listStyle: "none", display: "flex-row", justifyContent: 'center', alignItems: 'center'}}>{answer}<input name={`${item.num}`} type='radio'/></li>) : null}
                        </ul>
                    </div>
            </li>): null}</ul>
        </div>
}

export default SurveyTaker;