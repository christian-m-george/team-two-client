import React, {useState, useEffect} from 'react';
import Navigation from '../Navigation/Navigation';

const MySurveys = () => {
  const [surveys, setSurveys] = useState([""])
  useEffect(() => getSurveys())

    const getSurveys =  async () => {
      console.log('tried to get surveys');
        const url = `http://localhost:8000/survey/all`;
    
        const options = {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
          },
          credentials: 'include',
          cors: true
        };
        
        // console.log(JSON.stringify(surveyFormData) + " THIS IS SURVEY FORM DATA");
        const response = await fetch(url, options)
          .then(
            res => {
              if (res.status === 200) {
                res.json().then(
                data => data).catch(error => {
                throw new Error(error);
              })}}
          ).catch(error => {
            throw new Error(error);
          })
        if(response) setSurveys(response);
        return response;
    }
    return(
      <div className="wrapper">
        <Navigation />
       <h1>My Surveys</h1>
       <ul style={{height: 1000, width: "100%", listStyle: "none", paddingInlineStart: 0}}>{surveys.map(item => <li key={item.item}
       style={{padding: 10, margin: "auto", width: "85%", fontSize: 8}}
       >{JSON.stringify(item)}</li>)}</ul>
     </div>
    )
}

export default MySurveys;