import  React, { useState, useContext } from "react";
import './Login.css';
import {  Link } from "react-router-dom";
import validate from "../Utils/Validate.js";
// import { UserContext } from "../Context/UserContext";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailIsValid, setEmailValid] = useState(false);
    const [passwordIsValid, setPasswordValid] = useState(false)
    
    // const validateUserInputs = () => {
    //     return !validate.email(email) && !validate.password(password)
    // }
    
    // User data for login needs to be maxed against existing database user information, which does not currently exist
    const submitUserData = async () => {
        const url = 'http://localhost:8000/auth';
        const options = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            // 'Access-Control-Allow-Credentials': true
          },
          body: JSON.stringify(
            {email: email,
            password: password}
          ),
          credentials: 'include',
          cors: true
        };
        // console.log(userData)
        const response = await fetch(url, options)
          .then(res => {
            // if(res.status === 200) {
            //     window.location.replace("http://localhost:3000/create-survey")
            // }
            console.log(res.status);
          }).catch(
              err => console.error(err)
          );
          console.log(response);
    }

    return <div>

        <div className='header-wrapper wrapper'>
            <h1 className='greeting'> hello, friend</h1>
        </div>

        <div className='login-form'>

            <div className='email-input-wrapper input-wrapper wrapper'>
                <div className='label-wrapper wrapper'><label htmlFor='email'>email</label></div>
                <input type='text' id="email" name="email" onChange={event => setEmail(event.target.value)}></input>
            </div>

            <div className='password-input-wrapper input-wrapper wrapper'>
                <div className='label-wrapper wrapper'><label htmlFor='password'>password</label></div>
                <input type='password' id="password" name="password" onChange={event => setPassword(event.target.value)}></input>
            </div>

            <div className='button-wrapper wrapper'>
                <button disabled={!validate.email(email) || !validate.password(password)} onClick={() => submitUserData()}>Login</button>
            </div>

            <div className ='register-link-wrapper wrapper'>
                <Link to='/register'>Register Here</Link>
            </div>

        </div>
    </div>
};