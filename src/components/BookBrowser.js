import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {LoginContext} from './LoginProvider';
import './BookBrowser.css'

export default function BookBrowser() {
  const [books, setBooks] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredBooks, setFilteredBooks] = useState([])
  const { isAdmin } = useContext(LoginContext);
  const navigate = useNavigate();

  async function fetchBooks() {
    const response = await fetch(`http://127.0.0.1:7000/books`)
    const data = await response.json()
    setBooks(data)
    setFilteredBooks(data)
  }
  useEffect(() => {
    fetchBooks()
  }, []) //run once on page load

  useEffect(() => {
    setFilteredBooks(
      books.filter(book => {
        // Safely check for undefined or null values before calling .toLowerCase()
        const title = book.title ? book.title.toLowerCase() : '';
        const author = book.author ? book.author.toLowerCase() : '';
        return title.includes(searchTerm.toLowerCase()) || author.includes(searchTerm.toLowerCase());
      })
    );
  }, [searchTerm, books]);

  return (
    <div className="bookBrowser">
          <input type="text" className="searchBar" placeholder="Search by title or author..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          {isAdmin && (
            <button className="btnAddBook" onClick = {() => navigate('/addbook')}>Add New Book</button>
          )}

      <div className="bookContainer">
        {filteredBooks.map(book => (
          <div className="browserBook" key={book.id}>
            <img src={book.coverImage} />
            <h4>{book.title}</h4>
            <p>{book.author}</p>
            <p>{book.description}</p>
            <p className="publicationDate">
              {new Date(book.publicationDate).toLocaleDateString('en-CA', {year: 'numeric', month: 'short', day: 'numeric' })}
            </p>
            <br /><Link className="detailsLink" to={`/details/${book.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  )
}