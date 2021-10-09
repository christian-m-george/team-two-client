import  React, { useState } from "react";
import { useHistory, Link } from 'react-router-dom';
import validate from "../Utils/Validate.js";
import './Register.css';

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const history = useHistory();

    const userData = {
        firstName: fName, 
        lastName: lName,
        email: email, 
        password: password
    }

    // redirect to create-survey
    const reroute = () => {
        history.push("/login");
    }

    const submitUserData = (userData) => {
        const url = 'http://localhost:8000/user';
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
        if(response.status === 200) {
            reroute();
        };
      }).catch(err => console.log(err));
}

    return <div>

        <div className='header-wrapper wrapper'>
            <h1 className='welcome'> welcome, friend</h1>
        </div>

        <div className='register-form'>
            <form onSubmit={(event) => {
                event.preventDefault();
                submitUserData(userData);
            }}>

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
                <button 
                disabled={
                    !validate.email(email) || 
                    !validate.password(password) || 
                    !validate.name(fName) || 
                    !validate.name(lName)
                } 
                    >Register</button>
            </div>

            <div className='login-link-wrapper wrapper'>
                <Link to='/login'>Login Here</Link>
            </div>
            </form>
        </div>
    </div>
}
