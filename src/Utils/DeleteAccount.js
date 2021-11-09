import React, { useState, useEffect } from 'react';
import validate from './Validate';
import { useHistory , useParams} from 'react-router';


const deleteAccount = () => {
    const params = useParams();
    const history = useHistory();
    const token  = params.token;

    console.log(token + " THIS IS TOKEN");
    
    const url = process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_HEROKU}` : `${process.env.REACT_APP_LOCAL}`;
    return <div>
    <label htmlFor='email'>This is where you delete your account</label>
    </div>
}
export default deleteAccount;
