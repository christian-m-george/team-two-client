import React, { useState }  from "react";

const MultipleChoice = () => {
    const [answerField, setAnswerField] = useState([0, 1]);
    const [answerFieldInputs, setAnswerFieldInputs] = useState([{number: 0, value: ''}, {number: 1, value: ''}]);
    const [questionInput, setQuestionInput] = useState('');

    const nextNum = () => {
        return answerField[answerField.length-1] + 1;
    }

    // Need to update the state when the input on these fields is changed. Need to figure out a way to manage
    // different fields and inputs on these fields that can be added and removed
    const createAnswerFields = (answerField) => {
        const answerFields = answerField.map((num) =>
        <li key={num}>
            <label htmlFor='enter-answer' style={{height: 100, width: 20}}>enter your answer</label>
            <input  
                style={{height: 30, margin:10, width: 100}} 
                type='text' 
                onChange={(event) => {
                    const markers = answerFieldInputs.filter((a) => a.number != num);
                    markers[num] = {number: num, value: event.target.value};
                    console.log(JSON.stringify(markers) +  " WE ARE GOING TO SET THE ANSWER FIELD STATE TO THIS")
                    setAnswerFieldInputs(markers);
                }}
                />
            <button 
                onClick={() => {
                if(answerField.length > 2) {
                    console.log(num + " IS THE NUMBER OF REMOVED FIELD INPUT");

                    const newAnswerArray = answerField.filter((id) => id != num);
                    console.log(newAnswerArray + " THIS IS NEW ANSWER ARRAY");
                    setAnswerField(newAnswerArray);

                    // console.log(answerField + " THIS IS NSWER FIELD")

                    const newAnswerInputArray = answerFieldInputs.filter((fieldInput) => fieldInput.number != num);
                    console.log(JSON.stringify(newAnswerInputArray) + " THIS IS NEW ANSWER INPUT ARRAY");
                    setAnswerFieldInputs(newAnswerInputArray);

                    // console.log(answerFieldInputs + " THIS IS ANSWER INPUT FIELD");
                }}
                }>remove question</button>
        </li>
      );
      return (
        <ul style={{listStyle: 'none'}}>{answerFields}</ul>
      );
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
        <form onSubmit={(event) => {
            event.preventDefault();
            console.log(event.target[0].value)
            }}>
            <div>{createAnswerFields(answerField)}</div>
            <button style={{justifyContent: "center", padding: 10, height: 40, width: 120}}>save question</button>
        </form>
    </div>
    )
}

export default MultipleChoice;