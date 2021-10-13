import React, { useState } from 'react';
import SurveyTaker from './SurveyTaker';

const SurveyTakeWrapper = () => {
    const [survey, setSurvey] = useState(null);
    const [questions, setQuestions] = useState(null);
    const surveyId = 86;
    
    const questionUrl = process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_HEROKU}/question` : `${process.env.REACT_APP_LOCAL}/question`;
    const surveyUrl = process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_HEROKU}/survey` : `${process.env.REACT_APP_LOCAL}/survey`;
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      credentials: 'include',
      cors: true
    };

    const getQuestions = async () => {
        const response = await fetch(questionUrl, options)
          .then(async res => {
            console.log(res.status);
            if(res.status === 200) {
                return res.json().then(data =>  data).catch(error => console.log(error))
            } else {
              console.log("getSurvey returned a " + res.status);
            }
          }).catch(err => {
              console.error(err);
          });
          if(response) setQuestions(response);
        return response;
    }

    const getSurvey = async () => {
        const response = await fetch(surveyUrl, options)
          .then(res => {
            if(res.status === 200) {
              return res.json().then(data => data).catch(error => console.log(error))
            }
            else(console.log("getSurvey returned a " + res.status))
          }).catch(err => {
              console.error(err);
          });
          if(response) setSurvey(response);
        return response;
    }



    return (
      <div>
        <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <button 
                style={{width: 40, height: 20, padding: 20, margin: 5}}
                onClick={() => getQuestions().then(data => {
                    console.log(data);
                    getSurvey().then(values => console.log(values)).catch(err => console.log(err))
                }
                )}>Click on me</button>
        </div>
        {(survey && questions ? <SurveyTaker survey={survey} questions={questions}></SurveyTaker> : <div>nothin yet</div> )}
      </div>
    )
}







export default SurveyTakeWrapper;