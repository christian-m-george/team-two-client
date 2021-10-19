import React, { useState } from 'react';

const MultipleChoiceRenderer = (props) => {
const [userAnswerArray, setUserAnswerArray] = useState([]);


return (
<li key={props.question.order} style={{padding: 20, paddingInlineStart: 0, width:'100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <div style={{justifyContent: 'left', width: "85%"}}>
                <h5>{props.question.order + 1}. {props.question.questionText}</h5>
              </div>

              <ul style={{width: '100%', display: 'flex', flexDirection: 'column', margin: 'auto'}}>
              {props.question.answers.map((answer, idx) => <li key={idx} style={{width:'100%', paddingInlineStart: 0, display: 'flex', justifyContent: 'left', alignItems: 'center'}}>
                  <p style={{ margin: 5}}>{answer}</p>
                  <input
                  value={idx}
                  type='radio' 
                  // name={`options${questions.order}`} 
                  onClick={(e) => {
                    
                    const markers = props.answerArray.map((a, idx) => {
                        if (idx === props.question.order) {
                            return e.target.value;
                        } else {
                            return a
                        }
                    })
                    props.setUserAnswerArray(markers);


                    // const markers = userAnswerArray.map((a) => {
                    //   // console.log(JSON.stringify(a) + ' this is question order ' + question.order + " and this is question number " + a.questionNumber)
                    //   console.log(JSON.stringify(a) + "THIS IS STRINGIFIED ANSWER OBJ");
                    //   if(props.question.order !== a.questionNumber) {
                    //     return a;
                    //   } else {
                    //     return {questionNumber: a.questionNumber, answer: event.target.value}
                    //   }
                    // })
                    // console.log(JSON.stringify(markers) + ' this is maerkse')
                    // props.setUserAnswerArray(markers)
                }}
                  name={`${props.question.order}`} />
              </li>
              )}
              </ul>
          </li>
      )
}

export default MultipleChoiceRenderer;