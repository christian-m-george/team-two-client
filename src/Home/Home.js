import React, { useState, useEffect } from 'react';
import Navigation from '../Navigation/Navigation';
import { useHistory } from 'react-router';
import { IoDocumentsSharp } from "react-icons/io5";
import { HiDocumentAdd } from "react-icons/hi"

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

    const changeBackground = (e) => {
        e.target.style.background = 'grey';
    }
    const changeBack = (e) => {
        e.target.style.background = 'transparent';
    }

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


    return <div className='home'
        style={styles.home}>

        <Navigation></Navigation>

        <button className='home-icon-wrapper wrapper'
            style={styles.homeIcon}
            onClick={() => history.push('/survey-builder')}
            onMouseEnter={changeBackground}
            onMouseOut={changeBack}
        // style={{ transform: `${hoveredOne ? 'scale(1.5,1.5)' : null}` }}
        >
            Create Survey
            <HiDocumentAdd style={{ fontSize: 50, backgroundColor: "transparent" }} />
        </button>
        <button className='home-icon-wrapper wrapper'
            style={styles.homeIcon}
            onClick={() => history.push('/my-surveys')}
            onMouseEnter={changeBackground}
            onMouseLeave={changeBack}
        >
            My Surveys
            <IoDocumentsSharp style={{ fontSize: 50, backgroundColor: "transparent" }} />
        </button>
    </div>
}

const styles = {
    home: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center"
    },
    homeIcon: {
        width: "20vw",
        height: "20vh",
        border: "1px solid white",
        margin: 10,
        borderRadius: 5,
        backgroundColor: "white",
        display: "flex",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid black"
    }
}