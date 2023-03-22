import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { voteIncrease } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

import { initializeAnecdotes } from "../reducers/anecdoteReducer";

const AnecdotesList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) => {
    if (state.filter) {
      return state.anecdotes.filter((anec) =>
        anec.content.includes(state.filter)
      );
    } else {
      return state.anecdotes;
    }
  });

  const vote = (anecdote) => {
    dispatch(voteIncrease(anecdote));
    let message = `voted for ${anecdote.content}`;
    dispatch(setNotification(message, 2000));
  };

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <>
      <h2>Anecdotes</h2>
      <button onClick={() => console.log(anecdotes)}>anecdote log</button>

      {anecdotes.map((anecdote) => (
        <div key={anecdote.content}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdotesList;
