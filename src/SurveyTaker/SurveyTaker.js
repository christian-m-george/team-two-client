import { loadPartialConfig } from '@babel/core';
import React,  { useEffect, useState } from 'react';
import { useHistory , useParams} from 'react-router';
import Navigation from '../Navigation/Navigation';

const SurveyTaker = () => {
    const params = useParams();
    const history = useHistory();
    const [userId, setUserId] = useState(null);
    const [emails, setEmails] = useState([]);
    const [survey, setSurvey] = useState(null);
    const [questions, setQuestions] = useState(null);
    const token  = params.token;
    const [checkedToken, setCheckedToken] = useState(false);
    const [error, setError] = useState(null);

    
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
        fetch(`${url}/survey/verify`, validateTokenOptions)
          .then(res => 
            {
              if (res.status === 200) {
                res.json().then(data => {
                  console.log(data);
                  setEmails(data.emails);
                  setSurvey(data.survey);
                  setQuestions(data.questions);
                  setCheckedToken(true);
                })
              } else {
                setError('The token was not verified')
              }
            })
      }, []);


    return (
    <div style={{width: "100%"}}>
        <Navigation />
        {token && !checkedToken ? <div>checking token...</div> : null}
        {error ? <div>{error}</div> : null}

        <form>
        <div style={{width:'100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <h1>{survey ? `${survey.title}` : "...loading"}</h1>
        </div>
        <ul style={{margin: 'auto', listStyle: 'none', paddingInlineStart: 0, width:'100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        {questions ? questions.map((question) => <li key={question.order} style={{padding: 20, paddingInlineStart: 0, width:'100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{justifyContent: 'left', width: "85%"}}>
                  <h5>{question.order}. {question.questionText}</h5>
                </div>

                <ul style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 'auto'}}>
                {question.answers.map((answer, idx) => <li key={idx} style={{width:'100%', paddingInlineStart: 0, display: 'flex', justifyContent: 'left', alignItems: 'center'}}>
                    <p style={{ margin: 5}}>{answer}</p>
                    <input 
                    type='radio' 
                    name={`options${questions.order}`} 
                    onClick={(event) => {
                      event.preventDefault();
                      console.log('clicked'
                    )}}
                    name={`${question.order}`} />
                </li>
                )}
                </ul>
            </li>
        ) : null}
        </ul>
        </form>
    </div>
    )
}

export default SurveyTaker;