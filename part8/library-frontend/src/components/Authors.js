import { ALL_AUTHORS, EDIT_AUTHOR, ALL_BOOKS } from "../queries";
import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS);
  //const authors = [];
  // console.log(authors.data);

  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [EditAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const b = Number(born);
    EditAuthor({ variables: { setBornTo: b, name } });
  };

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <div>
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.data.allAuthors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Authors;
