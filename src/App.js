import "./App.css";
import { useState, useEffect } from "react";

import * as BooksAPI from "./BooksAPI";
import BookList from "./BookList";
import BookSearch from "./BookSearch";
import { Route, Routes } from "react-router-dom";

function App() {



  const [books, setBooks] = useState([]);

  const setchangeStatus = (event) => {
    const { name, value } = event.target

    BooksAPI.update(books.filter((b)=> b.id === name)[0],value)
    

    setBooks(prevBooks =>
      prevBooks.map(b =>
        b.id === name ? { ...b, status: value } : b
      )
    );



  }

  const addbook = (book) => {
    setBooks([...books, book[0]]);
  }



  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();

      const items = res.map((r) => ({ "id": r.id, "title": r.title, "author": r.authors[0], "status": "currentlyReading", "image": r.imageLinks.smallThumbnail }))
      setBooks(items);


    };

    getBooks();
  }, []);





  return (
    <Routes>
      <Route exact path="/search" element={
        <div className="app">
          <BookSearch  addbook={addbook} />
        </div>
      } />
      <Route exact path="/" element={
        <div className="app">
          <BookList books={books}  setchangeStatus={setchangeStatus} />
        </div>
      } />
    </Routes>


    // <div className="app">
    //   {showSearchPage ? (

    //   ) : (

    //   )}
    // </div>
  );
}

export default App;
