import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  showMessage,
  clearMessage,
  setNotification,
} from "../reducers/notificationReducer";
import anecdoteService from "../services/Anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (e) => {
    e.preventDefault();

    const content = e.target.anecdote.value;
    dispatch(createAnecdote(content));
    e.target.anecdote.value = "";

    let message = `successfully added ${content} to anecdotes`;
    dispatch(setNotification(message, 2000));
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
