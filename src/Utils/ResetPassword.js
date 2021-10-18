import React, { useState, useEffect } from 'react';
import validate from './Validate';
import { useHistory , useParams} from 'react-router';

const ResetPassword = () => {
    const [passwordOne, setPasswordOne] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');
    const [reset, setReset] = useState('');
    const params = useParams();
    const history = useHistory();
    const token  = params.token;

    console.log(token + " THIS IS TOKEN");
    
    const url = process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_HEROKU}` : `${process.env.REACT_APP_LOCAL}`;
    const validateTokenOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
          token: token
      }),
      credentials: 'include',
      cors: true
    };

    const changePasswordOptions = {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
          token: token,
          newPassword: passwordOne
      }),
      credentials: 'include',
      cors: true
    };

    useEffect(() => {
        fetch(`${url}/user/check-token`, validateTokenOptions)
          .then(res => 
            {
              if (res.status === 200) {
                res.json()
              } else {
                history.push('/login')
              }
            })
      }, []);

    

    const changePassword = async () => {
        console.log('we tried')
        await fetch(`${url}/user/reset-password`, changePasswordOptions).then(
            res => {
                if(res.status === 200) {
                    history.push('/login');
                }
                else {
                    setReset("There was a problem resetting your password, please try again later")
                }
            }
        )
    }

    if(!token) {
        history.push('/login')
    }


    return <div>
        <form onSubmit={async (event) => 
            {
                event.preventDefault();
                changePassword();
            }}>
            <label htmlFor='email'>Enter your new password</label>
            <input style={{width: "30%"}} type='text' maxLength='40' onChange={(event) => setPasswordOne(event.target.value)}/>
            <label htmlFor='email'>Enter your new password again</label>
            <input style={{width: "30%"}} type='text' maxLength='40' onChange={(event) => setPasswordTwo(event.target.value)}/>
            <button type='submit' disabled={!validate.password(passwordOne) || !validate.password(passwordTwo || passwordOne !== passwordTwo)}>Submit</button>
            {reset ? <div>{reset}</div> : null}
        </form>
        </div>
}

export default ResetPassword;