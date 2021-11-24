import React, { createContext } from 'react';
import Home from './Home/Home.js';
import Login from './Login/Login.js';
import Register from './Register/Register.js';
import Auth from './AuthContext/AuthContext.js';
import ImportSurvey from './ImportSurvey/ImportSurvey.js';
import SurveyTemplates from './SurveyTemplates/SurveyTemplates.js';
import AccountSettings from './AccountSettings/AccountSettings.js';
import SingleQuestionBuilder from './SingleQuestion/SingleQuestionBuilder.js';
import { Route } from 'react-router-dom';
import SurveyWizard from './SurveyBuilder/SurveyWizard.js';
import SurveyTakerWrapper from './SurveyTaker/SurveyTakerWrapper.js';
import MySurveys from './MySurveys/MySurveys.js';
import EditSurvey from './EditSurvey/EditSurvey.js';
import ChangePassword from './Utils/ChangePassword.js';
import ResetPassword from './Utils/ResetPassword.js';
import Responses from './Responses/Responses.js'
import PublishSurvey from './PublishSurvey/PublishSurvey.js';
import SurveyTaker from './SurveyTaker/SurveyTaker.js';
import dotenv from 'dotenv';
import GenerateQR from './Utils/generateQR.js';

dotenv.config();
const UserContext = createContext();
// perhaps pass function to set user state there in the context idk though
function App() {
  return (
    <div className='App'>
      <UserContext.Provider value={null}>
        <div>
          <Route exact path='/' component={Home}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/survey-builder' component={SurveyWizard}></Route>
          <Route path='/my-surveys' component={MySurveys}></Route>
          <Route path='/surveys/:id/responses' component={Responses}></Route>
          <Route path='/auth-context' component={Auth}></Route>
          <Route path='/import-survey' component={ImportSurvey}></Route>
          <Route path='/survey-templates' component={SurveyTemplates}></Route>
          <Route path='/account-settings' component={AccountSettings}></Route>
          <Route path='/single-question-builder' component={SingleQuestionBuilder}></Route>
          <Route path='/survey/:token' component={SurveyTaker}></Route>
          <Route path='/survey-taker' component={SurveyTakerWrapper}></Route>
          <Route path='/edit-survey' component={EditSurvey}></Route>
          <Route path='/publish-survey' component={PublishSurvey}></Route>
          <Route path="/change-password/:token" component={ResetPassword} />
          <Route exact path="/change-password" component={ChangePassword} />
          <Route path="/qrcode" component={GenerateQR} />
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
