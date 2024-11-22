import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './BookDetails.css'

function BookDetails() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    
    async function fetchBook() {
        const response = await fetch(`http://127.0.0.1:7000/books/${id}`);
        const data = await response.json();
        setBook(data);
    }
    useEffect(() => {
        fetchBook();
    }, [id]);

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bookdetails">
            <img src={book.coverImage} alt={book.title} />
            <h2>{book.title}</h2>
            <p className="author">{book.author}</p>
            <p className="publishedDate">Published: {book.publicationDate}</p>
            <p className="description">{book.description}</p>
        </div>
    );
}

export default BookDetails;
