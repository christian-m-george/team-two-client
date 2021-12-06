import React, { useState } from 'react';

const SliderRenderer = (props) => {
    const[sliderValue, setSliderValue] = useState(50);

    return(
        <li key={props.question.order} style={{padding:20, paddingInlineStart: 0, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{justifyContent: 'left', width: "85%"}}>
                <h5>{props.question.order + 1}. {props.question.questionText}</h5>
            </div>

            <div class="slidercontainer">
                <input type="range" min="1" max="100" initialValue="50" class="slider" id="myRange"
                onChange={(e) => {
                    const marker = props.answerArray.map((a, idx) => {
                        if (idx === props.question.order) {
                            //console.log(e.target.value);
                            return e.target.value;
                        }else{
                            return a
                        }})
                    props.setUserAnswerArray(marker)
                }}/>
            </div>
            <div class="sliderlabels" style={{display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center"}}>
                <p style={{padding: 10}}>{props.question.answers[0]}</p>
                <p style={{padding: 10}}>{props.question.answers[1]}</p>
                <p style={{padding: 10}}>{props.question.answers[2]}</p>
            </div>
        </li>
    )
}

export default SliderRenderer;