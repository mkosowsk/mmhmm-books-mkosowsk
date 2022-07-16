import { useState } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Link from "next/link";
import styles from "../styles/Home.module.css";

interface Book {
  id: string;
  description: string;
  imageUrl: string;
  author: string;
  title: string;
}

interface HomeProps {
  books: Array<Book>;
}

const Home = ({ books }: HomeProps) => {
  const [currentBooks, setCurrentBooks] = useState(books);

  const handleClick = async (id: string) => {
    // exploring different options for this handleClick and how it
    // relates to SSR was an interesting part of this exercise!

    // this approach first removes the deleted book from state,
    // sets the state, and then sends the API request out.
    // this should be the fastest UX but may go against SSR principles

    const newBooks = currentBooks.filter((book) => book.id !== id);
    setCurrentBooks(newBooks);
    await deleteBook(id);

    // the following approach uses the updated list of books to set state
    // and probably more closely adheres to SSR principles although
    // will be slower than the first approach for users depending on
    // how long the API response takes to come back

    // const newBooks = await deleteBook(id);
    // setCurrentBooks(newBooks);

    // another approach could be simply to reload the page after deletion
    // but this doesn't seem to be a great UX
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1>Bookshelf</h1>
        {/* I wasn't totally satisfied with how the following Link
        as I feel it semantically is really a Button. Future work
        could include making this more accessible */}
        <Link href="/add">
          <a className={styles.link}>Add book</a>
        </Link>
      </div>
      {currentBooks
        // the prompt did not ask to sort alphabetically by title
        // but I feel this is a common default for looking at a list of books
        // future work could include adding the ability to sort by other
        // parameters such as author, description, etc.
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((book) => (
          <div className={styles.card} key={book.id}>
            <div>
              <img src={book.imageUrl} />
            </div>
            <div className={styles.info}>
              <h3>{book.title}</h3>
              <p className={styles.author}>{book.author}</p>
              <p>{book.description}</p>
            </div>
            <DeleteOutlinedIcon
              onClick={() => handleClick(book.id)}
              className={styles.icon}
            />
          </div>
        ))}
    </div>
  );
};

export async function getServerSideProps() {
  const endpoint =
    "https://us-central1-all-turtles-interview.cloudfunctions.net/books";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Real authorization should be handled more securely
      // via env variables or other solutions
      Authorization: "mitchkosowski",
    },
  };

  const res = await fetch(endpoint, options);
  const books = await res.json();

  return { props: { books } };
}

async function deleteBook(id: string) {
  const endpoint = `https://us-central1-all-turtles-interview.cloudfunctions.net/books/${id}`;
  const options = {
    method: "DELETE",
    headers: {
      // Real authorization should be handled more securely
      // via env variables or other solutions
      Authorization: "mitchkosowski",
    },
  };

  // Note that the current functionality does not actually use
  // the return here and we could just simply await the fetch
  const res = await fetch(endpoint, options);
  const books = await res.json();

  return books;
}

export default Home;
