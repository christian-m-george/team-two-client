import React from 'react';
import { useHistory } from 'react-router';

const PublishSurvey = () => {
    const history = useHistory();
    const surveyId = history.location.state?.surveyId;

    return (
        <div>
            <div>hello</div>
            <button onClick={() => {
                history.push({
                    pathname: '/review-survey',
                    state: {
                        surveyId: surveyId
                    }
                })
            }}>you can still review/edit it</button>

            <div>
                <form>
                    Please enter the emails you wish to send a link to
                    <input type='text' />
                </form>
                <form>
                    Or you can receive a sharable link to your email
                </form>
            </div>
        </div>
    )
}

export default PublishSurvey;