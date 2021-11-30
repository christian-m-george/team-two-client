import React, { useState, useEffect } from 'react';
import Navigation from '../Navigation/Navigation';
import { useHistory } from 'react-router';
import ChangePassword from '../Utils/ChangePassword';

// Account Settings Component

export default function AccountSettings() {
    const [showChangePassword, setShowChangePassword] = useState(false);
    const history = useHistory();
    const token = history.location.state?.token;
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

    useEffect(() => {
        let isSubscribed = true;
        const validate = async () => await fetch(`${url}/user/check-token`, validateTokenOptions)
            .then(res => {
                if (res.status !== 200) {
                    history.push('/entrance');
                }
            }).catch(() => history.push(('/entrance')))

        validate();
        return () => (isSubscribed = false);
    }, []);



    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Navigation />
            <div className='wrapper'>
                This is AccountSettings component
            </div>
            <button onClick={() => setShowChangePassword(!showChangePassword)}>Change Password</button>
            {showChangePassword ? <div style={{
                margin: 10,
                padding: 10
            }}><ChangePassword /></div> : null}
            {/* <button onClick={() => setShowDeleteAccount(!showDeleteAccount)}>Change Password</button> */}
            {/* {showDeleteAccount ? <DeleteAccount /> : null} */}

        </div>
    )
}