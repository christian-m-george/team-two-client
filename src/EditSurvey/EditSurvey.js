import React from 'react';
import { useHistory } from 'react-router';

const EditSurvey = () => {
    const history = useHistory();
    const survey = history.location.state?.survey;
    if (survey) return (
        <div>
            <form>
                <div>{JSON.stringify(survey)}</div>
                <div>{survey.title}</div>
                <div>{`${survey.singleQuestion}`}</div>
                <div>{`${survey.isPrivate}`}</div>
                <div>{`${survey.isRandom}`}</div>
                <div>{survey.numQuestions}</div>
            </form>
        </div>)
    else {
        return <div>no survey yet</div>
    }
}

export default EditSurvey;