import Home from './Home/Home.js';
import Login from './Login/Login.js';
import Register from './Register/Register.js';
import SurveyBuilder from './SurveyBuilder/SurveyBuilder.js';
import CreateSurvey from './CreateSurvey/CreateSurvey.js';
import CopySurvey from './CopySurvey/CopySurvey.js';
import ImportSurvey from './ImportSurvey/ImportSurvey.js';
import SurveyTemplates from './SurveyTemplates/SurveyTemplates.js';
import AccountSettings from './AccountSettings/AccountSettings.js';
import SingleQuestionBuilder from './SingleQuestion/SingleQuestionBuilder.js';
import { Route } from 'react-router-dom';



function App() {
  return (
    <div className='App'>
          <Route exact path='/' component={Home}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/create-survey' component={CreateSurvey}></Route>
          <Route path='/survey-builder' component={SurveyBuilder}></Route>
          <Route path='/copy-survey' component={CopySurvey}></Route>
          <Route path='/import-survey' component={ImportSurvey}></Route>
          <Route path='/survey-templates' component={SurveyTemplates}></Route>
          <Route path='/account-settings' component={AccountSettings}></Route>
          <Route path='/single-question-builder' component={SingleQuestionBuilder}></Route>
    </div>
  );
}

export default App;
