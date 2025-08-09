

const Book = ({book, setchangeStatus}) => {

    return (
        
        <li key={book.id}>
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 192,
                            backgroundImage:
                                `url(${book.image})`,
                        }}

                    ></div>
                    <div className="book-shelf-changer">
                        <select name={book.id} value={book.status|| "none"} onChange={(event) => setchangeStatus(event)} >
                            <option value="none" disabled>
                                Move to...
                            </option>
                            <option value="currentlyReading">
                                Currently Reading
                            </option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">
                    {book.title}
                </div>
                <div className="book-authors">{book.author}</div>
            </div>
        </li>
    )
}


export default Book;