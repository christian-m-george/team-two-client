import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Navigation from '../Navigation/Navigation'
import SurveyIcon from './SurveyIcon';

const MySurveys = () => {
  const url = process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_HEROKU}` : `${process.env.REACT_APP_LOCAL}`;
  const [surveys, setSurveys] = useState([]);
  const [error, setError] = useState(null);
  const history = useHistory();
  const getSurveyOptions = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    credentials: 'include',
    cors: true
  };


  useEffect(() => {
    fetch(`${url}/survey/all`, getSurveyOptions)
      .then(results => {
        if (results.status === 200) {
          results.json()
            .then(data => {
              const surveys = data;
              setSurveys(surveys);
            })
        } else {
          setError("Failed to fetch your surveys, have you created any? If so, maybe try a page reload, or perhaps the server is down")
        }
      })
  }, [history]);


  const deleteSurvey = async (input) => {
    console.log(input);
    const options = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        surveyId: input
      }),
      credentials: 'include',
      cors: true
    };
    return await fetch(`${url}/survey/`, options)
      .then(res => {
        if (res.status === 200) {
          const newSurveys = surveys.filter(a => a.id !== input)
          setSurveys(newSurveys)

        }
      }).catch(error => console.log(error));
  }

  function nav(input) {
    history.push({
      pathname: "/edit-survey",
      state: {
        survey: input
      }
    });
  }

  return (
    <div style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <Navigation />
      <div style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}><h1>My Surveys</h1></div>

      <ul style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", height: "90", width: "90%%", listStyle: "none", paddingInlineStart: 0 }}>

        {surveys.length === 0 ? <div>...You May Have No Surveys :)</div> : surveys.map((item, idx) =>
          <li key={idx} style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: 'center', margin: 5, padding: 5, border: "1px solid black" }}>
            <SurveyIcon item={item} />
            <div>
              <button style={{ margin: 2, padding: 5 }} onClick={() => history.push({
                pathname: '/publish-survey',
                state: {
                  surveyId: item.id
                }
              })}>Publish</button>
              <button style={{ margin: 2, padding: 5 }} onClick={() => nav(item)}>Edit</button>
              <button style={{ margin: 2, padding: 5 }} onClick={async () => await deleteSurvey(item.id)}>Delete</button>
            </div>
          </li>)}
      </ul>
      {error ? <div className='wrapper' style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>{error}</div> : null}
    </div>
  )
}




export default MySurveys;


