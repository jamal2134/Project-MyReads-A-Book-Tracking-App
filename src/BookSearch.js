import { useState } from "react";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";
import { Link } from "react-router-dom";


const BookSearch = ({ addbook }) => {

    const [searchText, setSearchText] = useState("")
    const [showBooks, setShowBooks] = useState([])


    const searchBook = (event) => {
        setSearchText(event.target.value)
        const getBooks = async () => {
            if (event.target.value !== "") {
                const res = await BooksAPI.search(event.target.value, 10);
                //console.log(res)
                //.filter((r) => Array.isArray(r.authors) && r.authors.length > 0)

                if (!Array.isArray(res)) {
                    setShowBooks([]);

                } else {
                    const items = await res.map((r) => ({ "id": r.id, "title": r.title, "author": Array.isArray(r.authors) ? r.authors.length > 1 ? r.authors.join(", ") : r.authors[0] : "", "status": "none", "image": r.imageLinks?.smallThumbnail || "" }))
                    setShowBooks(items);
                }


            }

        };

        getBooks();
    }

    const setchangeStatus = (event) => {
        const { name, value } = event.target

        // const item = showBooks.filter((book) => book.id === name).map((book) => ({ ...book, status: value }))
        BooksAPI.update(showBooks.filter((b) => b.id === name)[0], value)


        addbook(showBooks.filter((book) => book.id === name).map((book) => ({ ...book, status: value })))

        setShowBooks(showBooks.filter((book) => book.id !== name))




    }



    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link
                    className="close-search"
                    to="/"
                >
                    Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        value={searchText}
                        onChange={searchBook}

                        type="text"
                        placeholder="Search by title, author, or ISBN"
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {showBooks.map((book) => (<Book key={book.id} book={book} setchangeStatus={setchangeStatus} />))}

                </ol>
            </div>
        </div>
    )
}




export default BookSearch;