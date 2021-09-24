import  React, { useState } from "react";
import './Login.css';
import { Link } from "react-router-dom";


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userData = {
        email: email,
        password: password
    }

    const submitUserData = (userData) => {
        console.log('clicked me!!!')
        // const url = 'http://localhost/test.htm';
        // const options = {
        //   method: 'POST',
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json;charset=UTF-8'
        //   },
        //   body: JSON.stringify(
        //     userData
        //   )
        // };
    
        console.log(userData)
        
        // fetch(url, options)
        //   .then(response => {
        //     console.log(response.status);
        //   });
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
                <button onClick={() => submitUserData(userData)}>Login</button>
            </div>

            <div className ='register-link-wrapper wrapper'>
                <Link to='/register'>Register Here</Link>
            </div>

        </div>
    </div>
}