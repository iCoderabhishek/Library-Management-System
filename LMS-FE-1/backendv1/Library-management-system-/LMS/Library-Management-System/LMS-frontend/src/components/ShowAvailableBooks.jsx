import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowAvailableBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch available books from the backend
    axios.get('http://localhost:5000/api/books/available')
      .then(response => {
        setBooks(response.data);  // Set state with data from backend
      })
      .catch(error => {
        console.error('Error fetching available books:', error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Available Books</h2>
        <ul>
          {books.map((book) => (
            <li key={book.id} className="border-b py-2">
              {book.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ShowAvailableBooks;
