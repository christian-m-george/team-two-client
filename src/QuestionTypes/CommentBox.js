import React, { useState }  from "react";

const CommentBox = (props) => {
    const [questionInput, setQuestionInput] = useState('');
    const [unsaved, changeSaved] = useState(true);

    const sendQuestion = async () => {
        const url = process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_HEROKU}/question` : `${process.env.REACT_APP_LOCAL}/question`;
        const options = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            // 'Access-Control-Allow-Credentials': true
          },
          body: JSON.stringify({
              surveyId: props.surveyId,
              num: props.num,
              questionType: 'comment box',
              questionText: questionInput
          }),
          credentials: 'include',
          cors: true
        };

        const response = await fetch(url, options)
          .then(res => {
            if(res.status === 200) {
                props.setSaved(true);
                if(unsaved){
                    props.setQuestionSaved(props.questionSaved + 1)
                    changeSaved(false)
               };
                res.json().then(data => console.log(data))
            }
          }).catch(err => {
              console.error(err);
          });
        return response;
    }

    return (
    <div className='comment-box wrapper' style={{width: '100%', justifyContent: "space-evenly"}}>
        <div>
            <label htmlFor='enter-your-question' style={{height: 100, width: 400}}>enter your question</label>
            <input style={{height: 30, margin:10, width: 400}} type='text' onChange={(event) => setQuestionInput(event.target.value)}/>
        </div>
        <form onSubmit={ (event) => {
            event.preventDefault();
             sendQuestion();
            }}>
            <button style={{justifyContent: "center", padding: 10, height: 40, width: 120}}>save question</button>
        </form>
    </div>
    )
}

export default CommentBox;