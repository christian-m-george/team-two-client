import React, {useState, useEffect} from 'react';

const MySurveys = () => {
  const [surveys, setSurveys] = useState([]);
  const url = process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_HEROKU}/survey/86` : `${process.env.REACT_APP_LOCAL}/survey/86`;
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    credentials: 'include',
    cors: true
  };
  
  useEffect(() => {
    fetch(url, options)
      .then(results => results.json())
      .then(data => {
        const surveys = data;
        setSurveys(surveys);
      });
  }, []);

  return (
    <div style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{display: "flex", justifyContent: "center", alignItems: 'center'}}><h1>My Surveys</h1></div>
     <ul style={{height: 1000, width: "100%", listStyle: "none", paddingInlineStart: 0}}>{surveys.length > 0 ? surveys.map(item => <li key={item.id}
     style={{padding: 10, margin: "auto", width: "85%", fontSize: 8}}
     >{JSON.stringify(item)}</li>) : <div>...Loading</div>}</ul>
    </div>
  );
}

export default MySurveys;