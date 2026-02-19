import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchBooks } from '../../store/reducers/bookSlice';

import SearchBar from '../../components/SearchBar/SearchBar';
import BookList from '../../components/BookList/BookList';
const DashBoard = () => {
  const dispatch = useDispatch<any>();
  const { books, status, error } = useSelector((state: any) => state.books);
  const [bookList, setBookList] = useState(books);
  function onSearch(searchTerm:any):void{
      const match = books.filter((item:any)=>{
        return item.title.toLowerCase().includes(searchTerm.toLowerCase())
      });
      setBookList(match)
  }
  useEffect(()=>{
    setBookList(books)
  },[books]);


  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks()); // Fetch books when the component mounts
    }
  }, [dispatch, status]);
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }
  return (
    <>
      <div className="flex w-full">
        <SearchBar onSearch={onSearch} />
      </div>
      <BookList booksList={bookList} />
    </>
  );
};

export default DashBoard;
