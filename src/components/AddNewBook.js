import { useState } from "react";
import { useNavigate } from "react-router";
import './AddEditBook.css'

export default function AddNewBook(){
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [publicationDate, setPublicationDate] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); //prevents page reload

        const newBook = {
            title,
            author,
            description,
            publicationDate,
            coverImage
        };

        try{
            const response = await fetch("http://127.0.0.1:7000/books", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBook),
            })
            if(response.ok) {
                alert("New book added successfully!");
                navigate('/'); //navigates back to book browser
            }
            else {
                alert("Error adding new book");
            }
        }
        catch (error){
            console.error("Error: ", error);
            alert("Error adding new book");
        }
    };

    return (
        <div className="NewBookForm">
            <h2>Add New Book</h2>
            <form onSubmit={handleSubmit}>
                <div className="bookForm">
                    <div className="Side1">
                        <div>
                            <label htmlFor="title">Title:</label>
                            <input type="text" className="textarea" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="author">Author:</label>
                            <input type="text" className="textarea" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="publicationDate">Publication Date:</label>
                            <input type="date" className="textarea" id="publicationDate" value={publicationDate} onChange={(e) => setPublicationDate(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="coverImage">Cover Image URL:</label>
                            <input type="url" className="textarea" id="coverImage" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} />
                        </div>
                    </div>
                    <div className="Side2">
                        <div>
                            <label htmlFor="description">Description:</label>
                            <textarea id="description" className="descriptionText" value={description} onChange={(e) => setDescription(e.target.value)} required />
                        </div>
                    </div>
                </div>
                <div className="buttonDiv">
                    <button className="cancelButton" onClick={() => navigate('/')}>Go Back</button>
                    <button className="submitButton" type="submit">Add Book</button>
                </div>
            </form>
        </div>
    )
}