import React, { useEffect } from 'react';
import Navigation from '../Navigation/Navigation';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { BarChart } from '../BarChart/BarChart';

// Component that renders links to MySurveys and CreateSurveys

export default function Home() {
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

    // useEffect(() => {
    //     async function fetchMyAPI() {
    //       let response = await fetch('api/data')
    //       response = await response.json()
    //       dataSet(response)
    //     }

    //     fetchMyAPI()
    //   }, [])

    useEffect(() => {
        let isSubscribed = true;
        const validate = async () => await fetch(`${url}/user/check-token`, validateTokenOptions)
            .then(res => {
                if (res.status !== 200) {
                    history.push('/login');
                }
            })

        validate();
        return () => (isSubscribed = false);
    }, []);


    return <div className='home'>

        <Navigation></Navigation>

        <div className='create-survey-wrapper wrapper'>
            <Link to='/survey-builder'>Create a survey from scratch</Link>
        </div>
        <div className='create-survey-wrapper wrapper'>
            <Link to='/my-surveys'>My Surveys</Link>
        </div>
        <BarChart />
    </div>
}

