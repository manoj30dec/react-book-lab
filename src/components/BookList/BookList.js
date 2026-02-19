import { useState, useEffect } from 'react';
import BookWidget from '../BookWidget/BookWidget';
const BookList = ({ booksList }) => {
  const [books, setBooks] = useState(booksList);
  useEffect(() => {setBooks(booksList)}, [booksList])
  return (
    <ul className="flex flex-wrap gap-[20px]">
      {books &&
        books.map((values) => {
         return  <BookWidget
            key={values.id}
            id={values.id}
            cover_image={values.cover_image}
            title={values.title}
            author={values.author}
            publication_year={values.publication_year}
            description={values.description}
          />;
        })}
    </ul>
  );
};

export default BookList;
