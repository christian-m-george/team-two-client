import React, {useState, useEffect} from 'react';


const MySurveys = () => {
  const [list, setList] = useState(['', ''])
  useEffect(() => {
    let mounted = true;
    getSurveys()
      .then(surveys => {
        if(mounted) {
          setList(surveys)
          // console.log(surveys);
        }
      })
    return () => mounted = false;
  }, [])

    const getSurveys =  async () => {
      console.log('tried to get surveys');
        const url = `http://localhost:8000/survey/all`;
    
        const options = {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
          },
          credentials: 'include',
          cors: true
        };
        
        let surveys;
        // console.log(JSON.stringify(surveyFormData) + " THIS IS SURVEY FORM DATA");
        const response = await fetch(url, options)
          .then(
            res => {
              if (res.status === 200) {
                res.json().then(
                data => {
                surveys = data;
                setList(data);
                console.log(data + " THIS IS DATA")
                return data
              }).catch(error => {
                throw new Error(error);
              })}}
          ).catch(error => {
            throw new Error(error);
          })
        console.log(response + " THI SIS RPEONSE")
        return surveys;
    }


    // const showSurveys = async () => {
    //   const surveys = await getSurveys();
    //   const surveyItems = surveys.map(a => 
    //     <ul>a.</ul>)
    // }

    // const mySurveys = async () => {
    //     let surveys = await getSurveys.map((a) => 
    //             <li>
    //                 <div>{JSON.stringify(a)}</div>
    //             </li>
    //         )
        
    //     return <ul style={{listStyle: "none"}}>{surveys}</ul>
    // }

    return     <div className="wrapper">
    <h1>My Surveys</h1>
    {/* <li>{showSurveys()}</li> */}
  </div>
}

export default MySurveys;