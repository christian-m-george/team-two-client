import { useState } from "react";

export const RadioButton = (props) => (
    <label>
      <input 
        type="radio"
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
      {props.name}
    </label>
    );
  
