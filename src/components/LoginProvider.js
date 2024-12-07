import { createContext, useState } from 'react';

const LoginContext = createContext()
const LoginProvider = ({children}) => {
  const [isAdmin, setIsAdmin] = useState(false)
  return (
    <LoginContext.Provider value={{isAdmin, setIsAdmin}}>
      {children}
    </LoginContext.Provider>
  )
}

export {LoginContext, LoginProvider}