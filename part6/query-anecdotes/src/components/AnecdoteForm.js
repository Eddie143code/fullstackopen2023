import { useQuery, useMutation, useQueryClient } from "react-query";
import { useContext } from "react";
import { createAnecdote } from "../services/Anecdotes";
import NotificationContext from "../NotificationContext";

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext);

  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnec) => {
      const anec = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", anec.concat(newAnec));
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    console.log("new anecdote");
    newAnecdoteMutation.mutate({ content });
    dispatch({ type: "show", payload: `added ${content} to anecdotes` });
    setTimeout(() => {
      dispatch({ type: "clear" });
    }, 2000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
