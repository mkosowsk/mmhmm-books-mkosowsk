import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

const Add = () => {
  const router = useRouter();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      title: { value: string };
      author: { value: string };
      description: { value: string };
      // don't type check imageUrl as we are using picsum link
    };

    const data = {
      title: target.title.value,
      author: target.author.value,
      description: target.description.value,
      // The Math.random busts the cache on picsum's end so we get
      // a new pic for every book
      imageUrl: `https://picsum.photos/125/200?${Math.random()}`,
    };
    const JSONdata = JSON.stringify(data);
    const endpoint =
      "https://us-central1-all-turtles-interview.cloudfunctions.net/books";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Real authorization should be handled more securely
        // via env variables or other solutions
        Authorization: "mitchkosowski",
      },
      body: JSONdata,
    };

    await fetch(endpoint, options);

    // More of a UX decision, but after adding one book
    // I chose to have the user go back to the list of books.
    // If there was a use case for many books to be added
    // at the same time this decision should be revisited.
    router.push("/");
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1>Add a new book</h1>
        <Link href="/">
          <a>
            <CloseIcon className={styles.icon} />
          </a>
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title" className={styles.label}>
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className={styles.input}
          required
        />

        <label htmlFor="author" className={styles.label}>
          Author
        </label>
        <input
          type="text"
          id="author"
          name="author"
          className={styles.input}
          required
        />

        <label htmlFor="description" className={styles.label}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className={styles.textarea}
          required
        />

        <label htmlFor="imageUrl" className={styles.label}>
          Image URL
        </label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          className={styles.input}
          required
        />

        <button type="submit" className={`${styles.link} ${styles.save}`}>
          Save
        </button>
      </form>
    </div>
  );
};

export default Add;
