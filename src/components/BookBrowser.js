import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './BookBrowser.css'

export default function BookBrowser() {
  const [books, setBooks] = useState([])
  async function fetchBooks() {
    const response = await fetch(`http://127.0.0.1:7000/books`)
    
    const data = await response.json()
    setBooks(data)
  }
  useEffect(() => {
    fetchBooks()
  }, []) //run once on page load

  return (
    <ul>
      {books.map(book => (
        <li className="browserBook" key={book.id}>
          <h2>{book.title}</h2>
          <img src={book.coverImage} />
          <p>{book.author}</p>
          <p>{book.description}</p>
          <p>{book.publicationDate}</p>
          <br /><Link to={`/details/${book.id}`}>View Details</Link>
        </li>
      ))}
    </ul>
  )
}