import { useState } from "react";
import { BrowserRouter as Router, Link, useMatch } from "react-router-dom";
import { Routes, Route, useNavigate } from "react-router";
import { useField } from "./hooks";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link to={"/"} style={padding}>
        home
      </Link>
      <Link to={"/anecdotes"} style={padding}>
        anecdotes
      </Link>

      <Link to={"/create-new"} style={padding}>
        create new
      </Link>
      <Link to={"/about"} style={padding}>
        about
      </Link>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>

    <ul>
      {anecdotes.map((anecdote) => (
        <Link key={anecdote.id} to={`/anecdotes/${anecdote.id}`}>
          <li>{anecdote.content}</li>
        </Link>
      ))}
    </ul>
  </div>
);

const Anecdote = ({ anecdote }) => {
  <div>
    <h3>{anecdote.author}</h3>
    <p>{anecdote.content}</p>
  </div>;
};

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
    See{" "}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
);

const CreateNew = (props) => {
  const content = useField("text");
  const author = useField("text");
  const url = useField("text");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      content: content.value,
      author: author.value,
      url: url.value,
      votes: 0,
    });
    props.addNew({
      content: content.value,
      author: author.value,
      url: url.value,
      votes: 0,
    });
    navigate("/anecdotes");
    props.notActive(content.value);
  };

  const resetAll = (e) => {
    e.preventDefault();
    content.opp.reset();
    author.opp.reset();
    url.opp.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.req} />
        </div>
        <div>
          author
          <input {...author.req} />
        </div>
        <div>
          url for more info
          <input {...url.req} />
        </div>
        <button>create</button>
        <button onClick={resetAll}>reset</button>
      </form>
    </div>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);
  const match = useMatch("/anecdotes/id");
  const anecdote = match
    ? anecdotes.find((anec) => anec.id === Number(match.params.id))
    : null;

  const [notification, setNotification] = useState("");

  const notActive = (content) => {
    setNotification(`a new anecdote '${content}' has been created!`);
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <Menu />
      <h1>Software anecdotes</h1>
      {notification ? <div>{notification}</div> : <div></div>}
      <Routes>
        <Route path="/notes/:id" element={<Anecdote anecdote={anecdote} />} />
        <Route
          path="/anecdotes"
          element={
            <AnecdoteList anecdotes={anecdotes} notification={notification} />
          }
        />
        <Route
          path="/create-new"
          element={<CreateNew addNew={addNew} notActive={notActive} />}
        />
        <Route path="/about" element={<About />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
