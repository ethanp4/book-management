import './App.css';

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import BookBrowser from './components/BookBrowser';
import BookDetails from './components/BookDetails';
import LoginPage from "./components/LoginPage";

function Header() {
  return(
    <header>
      <Link to="/">All Books </Link>
      <Link to="/login">Login</Link>
    </header>
  )
}

function App() {
  return (
    <BrowserRouter>

      <Header />
      <Routes>
        <Route index element={<BookBrowser/>}/>
        <Route path="/details/:id" element={<BookDetails/>}/> 
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
