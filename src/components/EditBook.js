import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import GenericModal from "./GenericModal";
import './AddEditBook.css'

export default function EditBook() {
    const [modalHeader, setModalHeader] = useState('');
    const [modalDescription, setModalDescription] = useState('');
    const dialog = useRef()
    const { id } = useParams();
    const [book, setBook] = useState({
        title: "",
        author: "",
        publicationDate: "",
        description: "",
        coverImage: "",
    }); 
    const navigate = useNavigate();

    async function fetchBook() {
        const response = await fetch(`http://127.0.0.1:7000/books/${id}`);
        const data = await response.json();
        setBook(data);
    }

    useEffect(() => {
        fetchBook();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://127.0.0.1:7000/books/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(book),
        });

        if (response.ok) {
            setModalHeader("Success");
            setModalDescription("Book updated successfully!");
            dialog.current.showModal();
        } else {
            setModalHeader("Error");
            setModalDescription("Failed to update the book. Please try again.");
            dialog.current.showModal();
        }
    };

    if (!book) {
        return <div>Loading...</div>
    }

    return(
        <div className = "editBook">
            <GenericModal ref={dialog} header={modalHeader} description={modalDescription} redirect={`/details/${id}`} />
            <h2>Edit Book</h2>
            <form>
                <div className="bookForm">
                    <div className="Side1">
                        <div> {/* editing the title */}
                            <label htmlFor="title">Title:</label>
                            <input type="text" className="textarea" id="title" name="title" value={book.title} onChange={handleChange} required />
                        </div>
                        <div> {/* editing the author */}
                            <label htmlFor="author">Author:</label>
                            <input type="text" className="textarea" id="author" name="author" value={book.author}  onChange={handleChange} required />
                        </div>
                        <div> {/* editing the publication date */}
                            <label htmlFor="publicationDate">Publication Date:</label>
                            <input type="date" className="textarea" id="publicationDate" name="publicationDate" value={book.publicationDate} onChange={handleChange} required />
                        </div>
                        <div> {/* editing the cover image */}
                            <label htmlFor="coverImage">Cover Image URL:</label>
                            <input type="url" className="textarea" id="coverImage" name="coverImage" value={book.coverImage} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="Side2">
                        <div> {/* editing the description */}
                            <label htmlFor="description">Description:</label>
                            <textarea id="description" className="descriptionText" name="description" value={book.description} onChange={handleChange} rows="4" required></textarea>
                        </div>
                    </div>
                </div>
                <div className="buttonDiv">
                    <button className="cancelButton" type="button"  onClick={() => navigate(`/details/${id}`)}>Cancel</button>
                    <button className="submitButton" type="submit" onClick={handleSubmit}>Save Changes</button>
                </div>
            </form>
        </div>
    ) 
}
