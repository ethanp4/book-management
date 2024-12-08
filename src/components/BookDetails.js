import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {LoginContext} from './LoginProvider';
import './BookDetails.css'

function BookDetails() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const { isAdmin } = useContext(LoginContext); // Access isAdmin from the context
    const navigate = useNavigate();
    
    async function fetchBook() {
        const response = await fetch(`http://127.0.0.1:7000/books/${id}`);
        const data = await response.json();
        setBook(data);
    }

    async function deleteBook(){
        if (window.confirm("Are you sure you want to delete this book?")) {
            await fetch(`http://127.0.0.1:7000/books/${id}`, {
                method: "DELETE",
            });
            navigate("/");
        }
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
            {isAdmin && (
                <div className = "adminSection">
                    <button onClick = {() => navigate(`/editbook/${id}`)}>Edit Book Details</button>
                    <button onClick = {deleteBook}>Delete Book</button>
                </div>
            )}
        </div>
    );
}

export default BookDetails;
