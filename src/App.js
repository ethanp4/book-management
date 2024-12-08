import './App.css';

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import BookBrowser from './components/BookBrowser';
import BookDetails from './components/BookDetails';
import LoginPage from "./components/LoginPage";
import EditBook from "./components/EditBook";

import { LoginContext, LoginProvider } from './components/LoginProvider';
import { useContext } from 'react';

function Header() {
  const {isAdmin, setIsAdmin} = useContext(LoginContext)
  return(
    <header>
      <Link to="/">All Books </Link>
      <Link to="/login">Login</Link>
      {isAdmin && <a className="logout" onClick={() => {localStorage.removeItem('isAdmin'); window.location.reload();}}>Log out</a>}
    </header>
  )
}


function App() {
  return (
    <LoginProvider> 
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<BookBrowser/>}/>
          <Route path="/details/:id" element={<BookDetails/>}/> 
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/editbook/:id" element={<EditBook/>}/>
        </Routes>
      </BrowserRouter>
    </LoginProvider>
  );
}

export default App;
