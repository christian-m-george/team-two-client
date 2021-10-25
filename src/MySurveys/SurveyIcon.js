import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';


const SurveyIcon = (props) => {
  const [responses, setResponses] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [error, setError] = useState(null);
  const [questionError, setQuestionError] = useState(null);
  const history = useHistory();
  const url = process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_HEROKU}` : `${process.env.REACT_APP_LOCAL}`;
  
  // http options to retrieve questions by survey id
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    credentials: 'include',
    cors: true
  };

  // Gets questions for all surveys
  useEffect(() => {
    fetch(`${url}/question/${props.item.id}`, options)
      .then(res => {
        if (res.status === 200) {
          res.json().then(data => {
            const questions = data;
            console.log(questions);
            setQuestions(questions)
          }).catch(err => setError('something went wrong' + JSON.stringify(err)))
        } else {
          setQuestionError('no questions or server error')
        }
      })
  }, [])
  // Gets responses for all surveys
  useEffect(() => {
    fetch(`${url}/response/survey/${props.item.id}`, options)
      .then(res => {
        if (res.status === 200) {
          res.json().then(data => {
            const responses = data.map(a => a.answers);
            console.log(responses);
            setResponses(responses)
          }).catch(err => setError('something went wrong' + JSON.stringify(err)))
        } else {
          setError('no responses or server error')
        }
      })
  }, [])


  console.log(props.item)
  return (<div
    style={{ padding: 10, margin: "auto", fontSize: 8 }}
  >
    {error ? <div>{error}</div> : null}
    <div style={{margin: 2, padding: 2}}>Title: {props.item.title}</div>
    <div style={{margin: 2, padding: 2}}>Private?: {`${props.item.isPrivate}`}</div>
    <div style={{margin: 2, padding: 2}}>Created: {props.item.createdAt}</div>
    <div style={{margin: 2, padding: 2}}>Updated: {props.item.updatedAt}</div>
    <div style={{margin: 2, padding: 2}}>Randomized? {`${props.item.isRandom}`}</div>
    <div style={{margin: 2, padding: 2}}>Number of questions: {props.item.numQuestions}</div>
    <div style={{margin: 2, padding: 2}}>One question at a time?: {`${props.item.singleQuestion}`}</div>
    <div style={{margin: 2, padding: 2}}>Is published?: {`${props.item.published}`}</div>
    {responses ? <button
      onClick={() => history.push({
        pathname: `/surveys/${props.item.id}/responses`,
        state: {
          questions: questions,
          responses: responses
        }
      })}
      style={{
        padding: 5,
        margin: 5,
        marginTop: 10,
        width: "90%"
      }}
    >
      See the responses
    </button> : null}
  </div>)
}


export default SurveyIcon;