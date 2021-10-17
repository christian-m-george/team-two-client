import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

const ReviewSurvey = () => {

    const history = useHistory();
    const survey = history.location.state?.survey
    

    return (

    <div 
        style={{width: "100%", display: "flex", justifyContent: 'center', alignItems: 'center'}}
    >
        {JSON.stringify(history.location.state)}
        
        <div>
            Your survey, {}
        </div>
    </div>
    )
}

export default ReviewSurvey;