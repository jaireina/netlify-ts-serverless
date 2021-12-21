import React, { useState } from "react";
import styles from "./form.module.css";

export function Form() {
  const [name, setName] = useState("");
  const [favoriteColor, setFavoriteColor] = useState("");
  const [response, setResponse] = useState();

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (name === "" || favoriteColor === "") {
      return;
    }

    const res = await fetch("/.netlify/functions/submit", {
      method: "POST",
      body: JSON.stringify({ name, favoriteColor }),
    }).then((res) => res.json());

    setResponse(res);
    setName("");
    setFavoriteColor("");
  }

  return (
    <>
      <pre>{JSON.stringify(response, null, 2)}</pre>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="name" className={styles.label}>
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className={styles.input}
          onChange={(e) => setName(e.target.value)}
          value={name}
        ></input>
        <label htmlFor="favoriteColor" className={styles.favoriteColor}>
          Favorite Color
        </label>
        <input
          type="text"
          name="favoriteColor"
          id="favoriteColor"
          className={styles.input}
          onChange={(e) => setFavoriteColor(e.target.value)}
          value={favoriteColor}
        ></input>

        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
