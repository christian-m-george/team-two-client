import React,  { useEffect, useState } from 'react';
import { useHistory , useParams} from 'react-router';
import Navigation from '../Navigation/Navigation';

const SurveyTaker = () => {
  const [userId, setUserId] = useState(null);
  const [emails, setEmails] = useState([]);
  const [survey, setSurvey] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [checkedToken, setCheckedToken] = useState(false);
  const [error, setError] = useState(null);
  const [userAnswerArray, setUserAnswerArray] = useState([]);
  const [success, setSuccess] = useState(null);
  const params = useParams();
  const history = useHistory();
  const token  = params.token;
    
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
                let myArray = [];
                for(let i=0; i< data.questions.length; i++) {
                  myArray.push({questionNumber: data.questions[i].order, answer: null})
                }
                setUserAnswerArray(myArray)
              })
            } else {
              setError('The token was not verified')
            }
          })
    }, []);

  const surveyResponseOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
        id: survey? survey.id : 1,
        responses: userAnswerArray,
    }),
    credentials: 'include',
    cors: true
  };
  
  const sendSurveyResponse = async () => {
    fetch(`${url}/response`, surveyResponseOptions).then(
      res => {
        if(res.status === 200) {
          setSuccess("Response saved!")
        }else {
          setError('failed to store responses, please try again later')
        }
      }
    )
  }


  return (
  <div style={{
      width: "100%",
      justifyContent: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: 'center'}}>
      <Navigation />
      {token && !checkedToken ? <div>checking token...</div> : null}
      {error ? <div>{error}</div> : null}
      {success? <div style={{
          width: "75%",
          height: "75%",
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          position: "absolute",
          fontSize: 40,
          zIndex: 10,
          backgroundColor: "rgba(0,0,0,0.5)"}}
      >{success}
      <div><button onClick={() => {
        history.push('/');
      }}>Click here to return home</button></div></div> : null}

      <form style={{width: "100%", visibility: success ? 'hidden' : 'visible' }}>
      <div style={{width:'100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <h1>{survey ? `${survey.title}` : "...loading"}</h1>
      </div>
      <ul style={{margin: 'auto', listStyle: 'none', paddingInlineStart: 0, width:'100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      {questions ? questions.map((question) => <li key={question.order} style={{padding: 20, paddingInlineStart: 0, width:'100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <div style={{justifyContent: 'left', width: "85%"}}>
                <h5>{question.order + 1}. {question.questionText}</h5>
              </div>

              <ul style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 'auto'}}>
              {question.answers.map((answer, idx) => <li key={idx} style={{width:'100%', paddingInlineStart: 0, display: 'flex', justifyContent: 'left', alignItems: 'center'}}>
                  <p style={{ margin: 5}}>{answer}</p>
                  <input
                  value={`${idx}`}
                  type='radio' 
                  // name={`options${questions.order}`} 
                  onClick={(event) => {
                    console.log(event.target.value + " " + question.order);
                    const markers = userAnswerArray.map((a) => {
                      // console.log(JSON.stringify(a) + ' this is question order ' + question.order + " and this is question number " + a.questionNumber)
                      console.log(JSON.stringify(a) + "THIS IS STRINGIFIED ANSWER OBJ");
                      if(question.order !== a.questionNumber) {
                        return a;
                      } else {
                        return {...a, answer: event.target.value}
                      }
                    })
                    console.log(JSON.stringify(markers) + ' this is maerkse')
                    setUserAnswerArray(markers)
                }}
                  name={`${question.order}`} />
              </li>
              )}
              </ul>
          </li>
      ) : null}
      </ul>
      <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto'}}>
        <button style={{width: "25%", padding: 5, margin: 20, marginBottom: 40}} 
        onClick={() => {
          sendSurveyResponse()
        }
        }
        type='button'>Submit your survey
        </button>
        </div>
      </form>
  </div>
  )
}

export default SurveyTaker;