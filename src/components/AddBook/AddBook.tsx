import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addBook } from "../../store/reducers/bookSlice";
import validate from "validate.js";

interface FormData {
  id: string;
  title: string;
  author: string;
  publication_year: string;
  genre: string;
  description: string;
  cover_image: string;
}

interface ValidationErrors {
  [key: string]: string[];
}

interface BookRecord extends FormData {}

const AddBook: React.FC = () => {
  const navigate = useNavigate();
  const param = useParams();
  const dispatch = useDispatch();
  const { books } = useSelector((state: any) => state.books);

  const [bookRecord, setBookRecord] = useState<BookRecord | undefined>();
  const [formData, setFormData] = useState<FormData>({
    id: "53265",
    title: "",
    author: "",
    publication_year: "",
    genre: "Fiction",
    description: "",
    cover_image: "/images/default.jpg",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [success, setSuccess] = useState(false);

  // Fetch book record based on param.id
  useEffect(() => {
    const book = books.find((book: BookRecord) => {
      return String(book.id) === String(param.id);
    });
    setBookRecord(book);
  }, [param.id]);

  // Update form data with book record
  useEffect(() => {
    if (bookRecord) {
      setFormData(bookRecord);
    }
  }, [bookRecord]);

  // Validation rules
  const constraints = {
    title: {
      presence: { allowEmpty: false, message: "is required" },
    },
    author: {
      presence: { allowEmpty: false, message: "is required" },
    },
    publication_year: {
      presence: { allowEmpty: false, message: "is required" },
    },
    genre: {
      presence: { allowEmpty: false, message: "is required" },
    },
    description: {
      presence: { allowEmpty: false, message: "is required" },
    },
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;
    const label = e.target.previousElementSibling?.innerHTML || name;

    if (value === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: [`${label} is required`],
      }));
    } else {
      setErrors((prevErrors) => {
        const { [name]: removedError, ...restErrors } = prevErrors;
        return restErrors;
      });
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const validationError = validate(formData, constraints) as ValidationErrors;

    if (validationError) {
      setErrors(validationError);
    } else {
      setSuccess(true);
    }
  };

  useEffect(() => {
    if (success) {
      dispatch(addBook(formData));
      setFormData({
        id: "53265",
        title: "",
        author: "",
        publication_year: "",
        genre: "Fiction",
        description: "",
        cover_image: "/images/default.jpg",
      });
      setErrors({});
      navigate("/");
    }
  }, [success]);

  return (
    <form
      className="form-horizontal"
      name="formBookAdd"
      onSubmit={handleSubmit}
    >
      <div className="row">
        <div className="col">
          <label htmlFor="title">Book Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors?.title && <p className="error">{errors.title[0]}</p>}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label htmlFor="author">Author Name</label>
          <input
            type="text"
            name="author"
            id="author"
            value={formData.author}
            onChange={handleChange}
          />
          {errors?.author && <p className="error">{errors.author[0]}</p>}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label htmlFor="publication_year">Published Year</label>
          <input
            type="text"
            name="publication_year"
            id="publication_year"
            value={formData.publication_year}
            onChange={handleChange}
          />
          {errors?.publication_year && (
            <p className="error">{errors.publication_year[0]}</p>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label htmlFor="genre">Genre</label>
          <select
            name="genre"
            id="genre"
            value={formData.genre}
            onChange={handleChange}
          >
            <option value="Fiction">Fiction</option>
            <option value="Classic">Classic</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            rows={4}
            cols={10}
            value={formData.description}
            onChange={handleChange}
          ></textarea>
          {errors?.description && (
            <p className="error">{errors.description[0]}</p>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button type="submit">Submit</button>
        </div>
      </div>
    </form>
  );
};

export default AddBook;
