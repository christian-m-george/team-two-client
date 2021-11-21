import React, { useState } from 'react';

const SliderRenderer = (props) => {
    const[sliderValue, setSliderValue] = useState(50);

    return(
        <li key={props.question.order} style={{padding:20, paddingInlineStart: 0, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{justifyContent: 'left', width: "85%"}}>
                <h5>{props.question.order + 1}. {props.question.questionText}</h5>
            </div>

            <div class="slidercontainer">
                <input type="range" min="1" max="100" value="50" class="slider" id="myRange"/>
            </div>
            <div class="sliderlabels" style={{display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center"}}>
                <p width="33.33333%" text-align="left">{props.question.leftLabel}</p>
                <p width="33.33333%" text-align="center">{props.question.centerLabel}</p>
                <p width="33.33333%" text-align="right">{props.question.rightLabel}</p>
            </div>
        </li>
    )
}

export default SliderRenderer;