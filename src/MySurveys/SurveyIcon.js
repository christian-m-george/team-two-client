import React from 'react';

const SurveyIcon = (props) => {
    return (<div
        style={{padding: 10, margin: "auto", fontSize: 8}}
        >
          <div>Title: {props.item.title}</div>
          <div>Private?: {`${props.item.isPrivate}`}</div>
          <div>Created: {props.item.createdAt}</div>
          <div>Updated: {props.item.updatedAt}</div>
          <div>Randomized? {`${props.item.isRandom}`}</div>
          <div>Number of questions: {props.item.numQuestions}</div>
          <div>One question at a time?: {`${props.item.singleQuestion}`}</div>
        </div>) }


export default SurveyIcon;