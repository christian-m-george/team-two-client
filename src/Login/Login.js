import  React, { useState } from "react";
import './Login.css';
import { Link, useHistory } from "react-router-dom";
import validate from "../Utils/Validate.js";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [, setUserId] = useState(null);
    const history = useHistory();
        
    // redirect to create-survey
    const reroute = () => {
        history.push("/");
    }
    console.log(process.env);

    const submitUserData = async () => {
        const url = process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_HEROKU}/auth` : `${process.env.REACT_APP_LOCAL}/auth`;
        const options = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
          },
          body: JSON.stringify(
            {email: email,
            password: password}
          ),
          credentials: 'include',
          cors: true
        };

        const response = await fetch(url, options).then(res => {
            if(res.status === 200) {
                res.json().then(data => {
                  setUserId(data.id);
                }).then(
                    reroute()
                )
            }
            }).catch(err => {
              console.log(err);
          });

        return response
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

export default Login;