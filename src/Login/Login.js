import  React, { useState } from "react";
import './Login.css';
import { Link, useHistory } from "react-router-dom";
import validate from "../Utils/Validate.js";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
        
    // redirect to create-survey
    const reroute = () => {
        history.push("/create-survey");
    }

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

        const response = await fetch(url, options)
          .then(res => {
            if(res.status === 200) {
                console.log("WE DID IT!!!!!!!!!!!!!!!")
                res.json();
                reroute();
            }
            console.log(res.status);
          }).catch(err => {
              console.error(err);
              return false;
          }
          );

        if (response) return true
        else return false;
    }

    return <div>

        <div className='header-wrapper wrapper'>
            <h1 className='greeting'> hello, friend</h1>
        </div>

        <div className='login-form'>
            <form onSubmit={(event) => {
                event.preventDefault();
                submitUserData();
            }}
            >
            <div className='email-input-wrapper input-wrapper wrapper'>
                <div className='label-wrapper wrapper'><label htmlFor='email'>email</label></div>
                <input type='text' id="email" name="email" onChange={event => setEmail(event.target.value)}></input>
            </div>

            <div className='password-input-wrapper input-wrapper wrapper'>
                <div className='label-wrapper wrapper'><label htmlFor='password'>password</label></div>
                <input type='password' id="password" name="password" onChange={event => setPassword(event.target.value)}></input>
            </div>

            <div className='button-wrapper wrapper'>
                <button disabled={!validate.email(email) || !validate.password(password)} >Login</button>
            </div>

            <div className ='register-link-wrapper wrapper'>
                <Link to='/register'>Register Here</Link>
            </div>
            </form>
        </div>
    </div>
};