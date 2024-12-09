import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowAllBorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/books/borrowed')
      .then(response => {
        setBorrowedBooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching borrowed books:', error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Borrowed Books</h2>
        <ul>
          {borrowedBooks.map((book) => (
            <li key={book.id} className="border-b py-2">
              {book.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ShowAllBorrowedBooks;
