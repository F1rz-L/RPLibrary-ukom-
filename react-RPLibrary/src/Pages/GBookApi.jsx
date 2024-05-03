import React, { useState } from 'react'
import axios from 'axios'

function GBookApi() {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);

    function handleChange(event) {
        setQuery(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setBooks([]);
        try {
            const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
                params: {
                    q: query,
                }
            });
            setBooks(response.data.items);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={query} onChange={handleChange} className="input input-bordered w-full max-w-xs" />
                <button type="submit" className="btn btn-primary">Search</button>
            </form>
            <ul>
                {books.map(function (book) {
                    const isbn13 = book.volumeInfo.industryIdentifiers
                    ? book.volumeInfo.industryIdentifiers.find(identifier => identifier.type === 'ISBN_13')
                    : null;
                    return (
                        <div>
                            <li key={book.id}>{book.volumeInfo.title}</li><br />
                            <li key={book.id}>{book.volumeInfo.authors}</li><br />
                            <li key={book.id}>{book.volumeInfo.publishedDate}</li><br />
                            <li key={book.id}>{book.volumeInfo.description}</li> <br />
                            <li key={book.id}>{isbn13 ? isbn13.identifier : 'ISBN Not available'}</li>
                            <div className="divider"></div>
                        </div>
                    );
                })}
            </ul>
        </div>
    );
}

export default GBookApi