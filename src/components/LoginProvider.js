import { createContext, useState } from 'react';
import { useEffect } from 'react';

const LoginContext = createContext()

const LoginProvider = ({children}) => {
  const [isAdmin, setIsAdmin] = useState(() => { // set initial value to whatever is in localstorage
    const storedIsAdmin = localStorage.getItem('isAdmin');
    return storedIsAdmin ? JSON.parse(storedIsAdmin) : false
  })

  useEffect(() => {
    localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
  }, [isAdmin]) //update localstorage when isAdmin changes

  return (
    <LoginContext.Provider value={{isAdmin, setIsAdmin}}>
      {children}
    </LoginContext.Provider>
  )
}

export {LoginContext, LoginProvider}