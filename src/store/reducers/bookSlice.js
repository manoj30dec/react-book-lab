import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch data
export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios.get("https://www.freetestapi.com/api/v1/books");
  return response.data; // Return the data for the fulfilled action
});

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    addBook: (state,param) => {
      state.books.unshift(param.payload)
    },
    deleteBook:(state, id)=>{
      console.log("delete book here")
    },
    editBookRecord:(state, id)=>{
      console.log("edit book record here")
    }
  }, // You can add other reducers here
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { addBook } = bookSlice.actions;

export default bookSlice.reducer;
