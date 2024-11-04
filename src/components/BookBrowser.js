import { useState, useEffect } from "react";

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
        <li key={book.id}>
          <h2>{book.title}</h2>
          <h2>{book.author}</h2>
          <h2>{book.description}</h2>
          <h2>{book.publicationDate}</h2>
          <h2>{book.coverImage}</h2>
        </li>
      ))}
    </ul>
  )
}