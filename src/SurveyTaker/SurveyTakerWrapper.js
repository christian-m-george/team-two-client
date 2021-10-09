import React from 'react';

const SurveyTakeWrapper = () => {
    const surveyId = 86;

    const getQuestions = async () => {
        const url = `http://localhost:8000/question/${surveyId}`;
        const options = {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            // 'Access-Control-Allow-Credentials': true
          },
          credentials: 'include',
          cors: true
        };
    
        const response = await fetch(url, options)
          .then(res => {
            if(res.status === 200) {
                return res.json().then(data => data)
            }
          }).catch(err => {
              console.error(err);
          });
        return response;
    }

    const getSurvey = async () => {
        const url = `http://localhost:8000/survey/${surveyId}`;
        const options = {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            // 'Access-Control-Allow-Credentials': true
          },
          credentials: 'include',
          cors: true
        };
    
        const response = await fetch(url, options)
          .then(res => {
            if(res.status === 200) {
                return res.json().then(data => data)
            }
          }).catch(err => {
              console.error(err);
          });
        return response;
    }

    return (

            <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <button 
                    style={{width: 40, height: 20, padding: 20, margin: 5}}
                    onClick={() => {
                    getQuestions().then(data => console.log(data)).then(
                    getSurvey().then(data => console.log(data)).catch(err => console.log(err)));
                }}>Click on me</button>
            </div>

    )
}

export default SurveyTakeWrapper;