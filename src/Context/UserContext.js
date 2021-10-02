
import { useState, createContext } from 'react';

export const UserContext = createContext({userId: "", userEmail: ""});

const Context = ({ children }) => {
    const [user, setUser] = useState({user: {}});

    return (
        <UserContext.Provider user={{user, setUser}}>{children}</UserContext.Provider>
    )

}

export default Context;