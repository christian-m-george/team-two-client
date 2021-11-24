import React from 'react';
import { useHistory } from 'react-router';

// This component is a button with the ability to request a cookie deletion and reroute to login scree on click
const Logout = () => {
    const history = useHistory();
    const url = process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_HEROKU}/logout` : `${process.env.REACT_APP_LOCAL}/logout`;

    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        },
        credentials: 'include',
        cors: true
    };

    const logout = async () => await fetch(url, options)
        .then(
            res => {
                if (res.status === 200) {
                    history.push('/login')
                }
                else {
                    console.log(res.status())
                }
            }).catch(err => console.log(err))

    return <button
        style={{
            margin: 5,
            border: 'none',
            background: 'none',
            color: 'white',
            fontSize: 'inherit',
            cursor: 'pointer'
        }}
        onClick={logout}>Logout
    </button>
}

export default Logout;