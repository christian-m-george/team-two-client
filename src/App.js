import Home from './Home';
import Login from './Login';
import Register from './Register';
import {
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className='App'>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
        </Switch>
    </div>
  );
}

export default App;
