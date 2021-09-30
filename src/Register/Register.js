import  React, { useState } from "react";
import './Register.css';
import {Link} from 'react-router-dom';
import validate from "../Utils/Validate.js";

export default function Register(props) {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [fName, setFName] = useState("");
const [lName, setLName] = useState("");

const userData = {
    firstName: fName, 
    lastName: lName,
    email: email, 
    password: password
}

const validateUserInputs = (inputs) => {
    return validate.name(inputs.firstName) && 
    validate.name(inputs.lastName) &&
    validate.email(inputs.email) &&
    validate.password(inputs.password)
}

const submitUserData = (userData) => {
    const url = 'http://localhost:8000/user';

    console.log(validateUserInputs(userData));

    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(
        userData
      )
    };

    console.log(userData)
    
    fetch(url, options)
      .then(response => {
        console.log(response.status);
      });
}

    return <div>

        <div className='header-wrapper wrapper'>
            <h1 className='welcome'> welcome, friend</h1>
        </div>

        <div className='register-form'>

            <div className='fname-input-wrapper input-wrapper'>
                <div className='label-wrapper wrapper'>
                    <label htmlFor='first name'>first name</label>
                </div>
                <input type='text' id="fname" name="fname" onChange={event => setFName(event.target.value)}></input>
            </div>

            <div className='lname-input-wrapper input-wrapper wrapper'>
                <div className='label-wrapper wrapper'>
                    <label htmlFor='last name'>last name</label>
                </div>
                <input type='text' id="lname" name="lname" onChange={event => setLName(event.target.value)}></input>
            </div>

            <div className='email-input-wrapper input-wrapper wrapper'>
                <div className='label-wrapper wrapper'>
                    <label htmlFor='email'>email</label>
                </div>
                <input type='text' id="email" name="email" onChange={event => setEmail(event.target.value)}></input>
            </div>

            <div className='password-input-wrapper input-wrapper wrapper' onChange={event => setPassword(event.target.value)}>
                <div className='label-wrapper wrapper'>
                    <label htmlFor='password'>password</label>
                </div>
                <input type='password' id="password" name="password"></input>
            </div>

            <div className='button-wrapper wrapper'>
                <button onClick={() => submitUserData(userData)}>Register</button>
            </div>

            <div className='login-link-wrapper wrapper'>
                <Link to='/login'>Login Here</Link>
            </div>
        </div>
    </div>
}
