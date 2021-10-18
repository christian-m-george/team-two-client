import React, { useState } from 'react';

const ChangePassword = () => {
    const [email, setEmail] = useState('');
    const [reset, setReset] = useState('');

    console.log(email);
    
    const url = process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_HEROKU}` : `${process.env.REACT_APP_LOCAL}`;
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
          email: email
      }),
      credentials: 'include',
      cors: true
    };

    const resetPassword = async () => {
        console.log('we tried')
        await fetch(`${url}/user/change-password`, options).then(
            res => {
                if(res.status === 200) {
                    setReset("Request made, if account exists you will receive an email (potentially in spam)")
                }
                else {
                    setReset("Request failed, try again later")
                }
            }
        )
    }

    return <div>
        <form onSubmit={async (event) => 
            {
                event.preventDefault()
                await resetPassword()
            }}>
            <label htmlFor='email'>Enter your email address</label>
            <input style={{width: "50%"}} type='text' maxLength='40' onChange={(event) => setEmail(event.target.value)}/>
            <button type='submit' disabled={email.length < 5}>Submit</button>
            {reset ? <div>{reset}</div> : null}
        </form>
        </div>
}

export default ChangePassword;