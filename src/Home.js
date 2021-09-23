import React from 'react';
import { Link } from 'react-router-dom';

export default Home;function Home() {
    return <div>YOOO
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
    </div>
}

