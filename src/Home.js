import React from 'react';
import { Link } from 'react-router-dom';

export default Home;function Home() {
    return <div className='home'>
        <div className='wrapper'>
        YOOO
        </div>

    <div className='link-wrapper wrapper'>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
    </div>
        <div className='create-survey-wrapper wrapper'>
            create survey
        </div>
        <div className='create-survey-wrapper wrapper'>
            take survey
        </div>
    </div>
}

