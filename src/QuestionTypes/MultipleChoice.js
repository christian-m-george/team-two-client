import React, { useState }  from "react";

const MultipleChoice = (props) => {
    const [answerField, setAnswerField] = useState([0, 1]);
    const [answerFieldInputs, setAnswerFieldInputs] = useState([{number: 0, value: ''}, {number: 1, value: ''}]);
    const [questionInput, setQuestionInput] = useState('');

    const nextNum = () => {
        return answerField[answerField.length-1] + 1;
    }

    const createAnswerFields = (answerField) => {
        const answerFields = answerField.map((num) =>
        <li key={num}>
            <div className='question-container' style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", verticalAlign: "middle"}}>
                <label htmlFor='enter-answer' style={{display: "vagra", justifyContent: "center", alignItems: "center", padding: 10, display: "flex", height: 30, width: "15%", fontSize: 11}}>enter your answer</label>
                <input  
                    style={{height: 50, margin:10, width: "65%"}} 
                    type='text' 
                    onChange={(event) => {
                        const markers = answerFieldInputs.map((a) => {
                            if (a.number !== num) {
                                return a;
                            } else {
                                a.value = event.target.value;
                                return a;
                            }
                        });
                        setAnswerFieldInputs(markers);
                    }}
                />
           
            <button 
                onClick={() => {
                    if(answerField.length > 2) {
                        
                        const newAnswerArray = answerField.filter((key) => key !== num);
                        console.log(newAnswerArray + " THIS IS NEW ANSWER ARRAY");
                        setAnswerField(newAnswerArray);
                        
                        const newAnswerInputArray = answerFieldInputs.filter((fieldInput) => fieldInput.number !== num);
                        console.log(JSON.stringify(newAnswerInputArray) + " THIS IS NEW ANSWER INPUT ARRAY");
                        setAnswerFieldInputs(newAnswerInputArray);
                    
                    }}
                }
                style={{width: "12%", height: 20}}
                >remove</button>
            
            </div>
            
        </li>
      );
      return (
        <ul style={{listStyle: 'none', paddingInlineStart: 0}}>{answerFields}</ul>
      );
    }

    const sendQuestion = async () => {
        const url = 'http://localhost:8000/survey/';
        const options = {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            // 'Access-Control-Allow-Credentials': true
          },
          body: JSON.stringify({
              surveyId: props.surveyId,
              num: props.num,
              questionInput,
              answerFieldInputs
          }),
          credentials: 'include',
          cors: true
        };

        const response = await fetch(url, options)
          .then(res => {
            if(res.status === 200) {
                console.log("request good")
                res.json();
            }
          }).catch(err => {
              console.error(err);
          });
        return response;
    }

    return (
    <div className='multiple-choice-wrapper wrappe' style={{justifyContent: "space-evenly"}}>
        <div>
            <label htmlFor='enter-your-question' style={{height: 100, width: 400}}>enter your question</label>
            <input style={{height: 30, margin:10, width: 400}} type='text' onChange={(event) => setQuestionInput(event.target.value)}/>
        </div>
            <button 
                style={{margin: 10}} 
                onClick={() => {
                    const nxt = nextNum();
                    setAnswerField([...answerField, nxt])
                    setAnswerFieldInputs([...answerFieldInputs, {number: nxt, value: ''}])
                }}
                >add answer field
            </button>
            
            <button
                onClick={() => {
                    if(answerField.length > 2) {
                        setAnswerField(answerField.slice(0, answerField.length-1))
                        setAnswerFieldInputs(answerFieldInputs.slice(0, answerFieldInputs.length-1))
                    }
                }}>
                remove answer field
            </button>
        <form onSubmit={ (event) => {
            event.preventDefault();
             sendQuestion();
            }}>
            <div>{createAnswerFields(answerField)}</div>
            <button style={{justifyContent: "center", padding: 10, height: 40, width: 120}}>save question</button>
        </form>
    </div>
    )
}

export default MultipleChoice;