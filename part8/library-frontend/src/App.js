import { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";

const App = () => {
  const [page, setPage] = useState("login");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("login");
  };

  useEffect(() => {
    if (localStorage.getItem("bookUser")) {
      setToken(localStorage.getItem("bookUser"));
    }
  }, [page, token]);

  return (
    <div>
      <div>
        {token && (
          <>
            <button onClick={() => setPage("authors")}>authors</button>
            <button onClick={() => setPage("books")}>books</button>
            <button onClick={() => setPage("add")}>add book</button>
            <button
              onClick={() => {
                logout();
              }}
            >
              logout
            </button>
          </>
        )}
      </div>

      {token && (
        <>
          <Authors show={page === "authors"} />
          <Books show={page === "books"} />
          <NewBook show={page === "add"} />
        </>
      )}
      {!token && <Login show={page === "login"} setToken={setToken} />}
    </div>
  );
};

export default App;
