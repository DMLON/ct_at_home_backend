
import React, { useState } from 'react'

export const LoginContext = React.createContext();


export const LoginProvider = ({defaultValue = null, children}) => {
    const [user, setUser] = useState(defaultValue);

    return <LoginContext.Provider value={{user,setUser}}>
        {children}
    </LoginContext.Provider>
}
