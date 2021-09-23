import  React, { useState } from "react";
import './Register.css';
import {Link} from 'react-router-dom';

export default function Register(props) {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [fname, setFName] = useState("");
const [lname, setLName] = useState("");

    return <div>
        <h1 className='welcome'> welcome, friend</h1>

        <div className='register-form'>

            <div className='fname-input-wrapper input-wrapper'>
            <div className='label-wrapper'><label for='first name'>first name</label></div>
                <input type='text' id="fname" name="fname" onChange={event => setFName(event.target.value)}></input>
            </div>

            <div className='lname-input-wrapper input-wrapper'>
            <div className='label-wrapper'><label for='last name'>last name</label></div>
                <input type='text' id="lname" name="lname" onChange={event => setLName(event.target.value)}></input>
            </div>

            <div className='email-input-wrapper input-wrapper'>
            <div className='label-wrapper'><label for='email'>email</label></div>
                <input type='text' id="email" name="email" onChange={event => setEmail(event.target.value)}></input>
            </div>

            <div className='password-input-wrapper input-wrapper' onChange={event => setPassword(event.target.value)}>
            <div className='label-wrapper'><label for='password'>password</label></div>
                <input type='text' id="password" name="password"></input>
            </div>

            <div className='button-wrapper'>
                <button>Login</button>
            </div>

            <div>
                    <Link to='/login'>Login Here</Link>
            </div>
        </div>
    </div>
}
