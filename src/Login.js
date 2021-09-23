import  React, { useState } from "react";
import './Login.css';
import Register from './Register';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    return <div>
        <h1 className='greeting'> hello, friend</h1>

        <div className='login-form'>

            <div className='email-input-wrapper input-wrapper'>
                <div className='label-wrapper'><label for='email'>email</label></div>
                <input type='text' id="email" name="email" id='email' onChange={event => setEmail(event.target.value)}></input>
            </div>

            <div className='password-input-wrapper input-wrapper'>
                <div className='label-wrapper'><label for='password'>password</label></div>
                <input type='text' id="password" name="password" id='password' onChange={event => setPassword(event.target.value)}></input>
            </div>

            <div className='button-wrapper'>
                <button>Login</button>
            </div>

            <div className ='register-link-wrapper'>
                    <Link to='/register'>Register Here</Link>
            </div>

        </div>
    </div>
}