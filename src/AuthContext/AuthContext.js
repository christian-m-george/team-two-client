import React, {useReducer} from 'react';

const initialState = {userId: null, isAuth: false, isLoading: false};

function reducer(state, action) {
  switch (action.type) {
    case 'AUTHORIZED':
      return {userId: 33, isAuth: true, isLoading: false}
    case 'UNAUTHORIZED':
      return {userId: null, isAuth: false, isLoading: false}
    case 'LOADING':
      return {...state, isLoading: true} 
    case 'LOGOUT' :
      return initialState 
    default:
      throw new Error();
  }
}

export default function Auth() {
  const [state, dispatch] = useReducer(reducer, {initialState});
    return (
    <>
      User status: {state.userId} + {state.isAuth ? " authorized " : " not authorized "} + {state.isLoading ? "<div>...is loading</div>" : "<div>nope</div>"}
      <button onClick={() => dispatch({type: 'AUTHORIZED'})}>AUTH</button>
      <button onClick={() => dispatch({type: 'UNAUTHORIZED'})}>UNAUTH</button>
      <button onClick={() => dispatch({type: 'LOADING'})}>LOADING</button>
      <button onClick={() => dispatch({type: 'LOGOUT'})}>LOGOUT</button>
    </>
  );
}