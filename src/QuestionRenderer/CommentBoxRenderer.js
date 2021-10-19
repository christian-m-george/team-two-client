import React, { useState } from 'react';

const MultipleChoiceRenderer = (props) => {
const [userComment, setUserComment] = useState('');

return (
<li key={props.question.order} style={{padding: 20, paddingInlineStart: 0, width:'100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <div style={{justifyContent: 'left', width: "85%"}}>
                <h5>{props.question.order + 1}. {props.question.questionText}</h5>
              </div>

              <div style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 'auto'}}>
                  <textarea
                  type='text' 
                  style={{
                      width: "80%",
                      height: 50,
                      padding: 3,
                      margin: 10,
                      marginLeft: 'auto',
                      marginRight: 'auto'
                  }}
                  onChange={(e) => {
                    const marker = props.answerArray.map((a, idx) => {
                        if (idx === props.question.order) {
                            return e.target.value;
                        } else {
                            return a
                        }
                    })
                    props.setUserAnswerArray(marker);
                }}
                  name={`${props.question.order}`}></textarea>
              </div>
          </li>
      )
}

export default MultipleChoiceRenderer;