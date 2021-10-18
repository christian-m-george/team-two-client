import React, { useEffect } from 'react';
import Navigation from '../Navigation/Navigation';
import { Link, useLocation, useHistory } from 'react-router-dom';


export default function Home() {
    // const history = useHistory();
    // const token = history.location.state?.token;

    // const url = process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_HEROKU}` : `${process.env.REACT_APP_LOCAL}`;
    // const validateTokenOptions = {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json;charset=UTF-8',
    //   },
    //   body: JSON.stringify({
    //       token: token
    //   }),
    //   credentials: 'include',
    //   cors: true
    // };

    // useEffect(() => {
    //     fetch(`${url}/user/check-token`, validateTokenOptions)
    //       .then(res => 
    //         {
    //           if (res.status === 200) {
    //             res.json()
    //           } else {
    //             history.push('/login')
    //           }
    //         })
    //   }, []);


    return <div className='home'>
        <div className='wrapper'>
            <Navigation></Navigation>
        </div>
        <div className='create-survey-wrapper wrapper'>
            <Link to='/create-survey'>Create Survey</Link>
        </div>
        <div className='create-survey-wrapper wrapper'>
            <Link to='/my-surveys'>My Surveys</Link>
        </div>
    </div>
}

