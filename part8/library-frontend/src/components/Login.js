import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { USER_LOGIN } from "../queries";

const Login = (props) => {
  const [username, setUsername] = useState("");
  //const [password, setPassword] = useState("");

  const [userLogin, result] = useMutation(USER_LOGIN);

  const handleSubmit = (e) => {
    e.preventDefault();

    userLogin({ variables: { username } });
  };

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      props.setToken(token);
      localStorage.setItem("bookUser", token);
    }
  }, [result.data]); // eslint-disable-line

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <br />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">username: </label>
          <input
            name="username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        {/*<div>
          <label htmlFor="password">password: </label>
          <input
            type="text"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div> */}
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Login;
