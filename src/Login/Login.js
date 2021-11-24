import React, { useState } from "react";
import './Login.css';
import { Link, useHistory } from "react-router-dom";
import validate from "../Utils/Validate.js";

// This component is a form that allows submission of emails and passwords. It authorizes those
// credentials by sending them to a node server that validates against a postgres DB
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [, setUserId] = useState(null);
    const [error, setError] = useState(null);
    const history = useHistory();

    // redirect to create-survey
    const reroute = (id, token) => {
        history.push({
            pathname: "/",
            state: {
                id: id,
                token: token
            }
        });
    }

    // http post request
    const submitUserData = async () => {
        const url = process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_HEROKU}/auth` : `${process.env.REACT_APP_LOCAL}/auth`;
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(
                {
                    email: email,
                    password: password
                }
            ),
            credentials: 'include',
            cors: true
        };

        const response = await fetch(url, options).then(res => {
            console.log(res.status);
            if (res.status === 200) {
                console.log(200);
                res.json().then(data => {
                    console.log(JSON.stringify(data) + "THIS IS DATA")
                    setUserId(data.id);
                    reroute(data.id, data.token);
                }).catch(error => console.log(error))
            } else {
                setError(res.statusText)
            }
        }).catch(err => {
            console.log(err.message);
        });

        return response
    }

    return <div>

        <div className='header-wrapper wrapper'
            style={{
                backgroundColor: 'springgreen',
                marginBottom: 50
            }}>
            <h1 className='greeting'>Questioneer</h1>
        </div>

        <div className='login-form'>
            <form
                style={{
                    paddingTop: 25,
                    paddingBottom: 25,
                    backgroundColor: 'springgreen',
                    width: '80%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    borderRadius: 5
                }}
                onSubmit={(event) => {
                    event.preventDefault();
                    submitUserData();
                }}
            >
                <div className='email-input-wrapper input-wrapper wrapper'>
                    <div className='label-wrapper wrapper'><label htmlFor='email'>email</label></div>
                    <input type='text' id="email" name="email" onChange={event => {
                        setEmail(event.target.value)
                        setError(null);
                    }}></input>
                </div>

                <div className='password-input-wrapper input-wrapper wrapper'>
                    <div className='label-wrapper wrapper'><label htmlFor='password'>password</label></div>
                    <input type='password' id="password" name="password" onChange={event => {
                        setPassword(event.target.value)
                        setError(null);
                    }}></input>
                </div>

                <div className='button-wrapper wrapper'>
                    <button disabled={!validate.email(email) || !validate.password(password)} >Login</button>
                </div>
                {error ? <div className='wrapper'>{error}</div> : null}
                <div className='register-link-wrapper wrapper'>
                    <Link to='/register'>Register Here</Link>
                    <button style={{ margin: 5 }} onClick={() => {
                        history.push('/change-password');
                    }}>Forgot password?</button>
                </div>
            </form>
        </div>
    </div>
};

export default Login;