import React, {createContext} from 'react';
import Home from './Home/Home.js';
import Login from './Login/Login.js';
import Register from './Register/Register.js';
import SurveyBuilder from './SurveyBuilder/SurveyBuilder.js';
import CreateSurvey from './CreateSurvey/CreateSurvey.js';
import Auth from './AuthContext/AuthContext.js';
import ImportSurvey from './ImportSurvey/ImportSurvey.js';
import SurveyTemplates from './SurveyTemplates/SurveyTemplates.js';
import AccountSettings from './AccountSettings/AccountSettings.js';
import SingleQuestionBuilder from './SingleQuestion/SingleQuestionBuilder.js';
import { Route } from 'react-router-dom';
import SurveyWizard from './SurveyBuilder/SurveyWizard.js';
import SurveyTakerWrapper from './SurveyTaker/SurveyTakerWrapper.js';
import MySurveys from './MySurveys/MySurveys.js';

const UserContext = createContext();

function App() {
  return (
    <div className='App'>
      <UserContext.Provider value={null}>
      <div>
          <Route exact path='/' component={Home}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/create-survey' component={CreateSurvey}></Route>
          <Route path='/survey-builder' component={SurveyBuilder}></Route>
          <Route path='/my-surveys' component={MySurveys}></Route>
          <Route path='/auth-context' component={Auth}></Route>
          <Route path='/import-survey' component={ImportSurvey}></Route>
          <Route path='/survey-templates' component={SurveyTemplates}></Route>
          <Route path='/account-settings' component={AccountSettings}></Route>
          <Route path='/single-question-builder' component={SingleQuestionBuilder}></Route>
          <Route path='/survey-wizard' component={SurveyWizard}></Route>
          <Route path='/survey-taker' component={SurveyTakerWrapper}></Route>
  
      </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
