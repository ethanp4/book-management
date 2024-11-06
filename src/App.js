import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import BookBrowser from './components/BookBrowser';
import BookDetails from './components/BookDetails';
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Link to="/">All Books</Link>
      <Link to="/login">Login</Link>
      <Routes>
        <Route path="/" element={<BookBrowser/>}/>
        {/* a book object or id can be passed into the book
        details component once a book is clicked */}
        <Route path="/details/:id" element={<BookDetails/>}/> 
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
