import React, { useState } from 'react';
import './BookWidget.css';
import { useNavigate } from 'react-router-dom';

interface Props {
  id: string;
  title: string;
  author: string;
  publication_year: number;
  genre: string[];
  description: string;
  cover_image: string;
}

const BookWidget: React.FC<Props> = ({
  id,
  title,
  author,
  publication_year,
  genre,
  description,
  cover_image,
}) => {
  const [isMarkRead, setIsMarkRead] = useState<boolean>(false);
  const navigate = useNavigate()
  const markAsRead = (e: React.FormEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLInputElement; // Narrow the type to HTMLInputElement
    target.checked ? setIsMarkRead(true) : setIsMarkRead(false);
  };

  const editBookDetail = (e: React.FormEvent<HTMLButtonElement>, id:string): void => {
    //const target = e.target as HTMLButtonElement; // Narrow the type to HTMLInputElement
    // console.log(id)
    navigate(`/details/${id}`)
  };
  

  return (
    <li
      id={id}
      className={`w-[calc((100%/4)-20px)] shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)]  rounded-md overflow-hidden ${
        isMarkRead ? 'markAsRead' : ''
      }`}
    >
      <picture>
        <img src={cover_image} className="w-full max-h-[210px]" alt={title} />
      </picture>
      <div id="content" className="p-4">
        <div id="title" className="font-bold uppercase leading-normal mb-2 ">
          {title}
        </div>
        <span id="author" className="block font-bold">
          {author}
        </span>

        <span id="published" className="blcok font-bold text-red-500">
          {publication_year}
        </span>
        <span id="pages" className="font-bold block mb-2">
          {genre}
        </span>
        <p className="mb-4">{description}</p>
        <div className="flex justify-between">
          <button disabled={isMarkRead} className={isMarkRead?"disabled":""} onClick={(e) =>editBookDetail(e, id)}>Edit this</button>
          <label className="cursor-pointer  flex align-middle">
            <input
              id="markRead"
              type="checkbox"
              className="checkbox"
              onChange={markAsRead}
              disabled={isMarkRead ? true : false}
            />
            Mark as read
          </label>
        </div>
      </div>
    </li>
  );
};

export default BookWidget;
