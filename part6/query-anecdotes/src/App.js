import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { getAll, voteInc } from "./services/Anecdotes";

const App = () => {
  const { status, data, error } = useQuery("anecdotes", getAll, {
    retry: false,
  });
  const queryClient = useQueryClient();

  const newVoteMutation = useMutation(voteInc, {
    onSuccess: (newVote) => {
      const anecdotesList = queryClient.getQueryData("anecdotes");

      const newAnecdotes = anecdotesList.map((anec) => {
        return anec.id === newVote.id ? newVote : anec;
      });
      queryClient.setQueryData("anecdotes", newAnecdotes);
      console.log(newAnecdotes);
    },
  });

  const anecdotes = data;

  const handleVote = (anecdote) => {
    newVoteMutation.mutate(anecdote);
  };

  if (status === "loading") {
    return <div>loading data...</div>;
  }

  if (status === "error") {
    <div>
      anecdote service not available due to problems in server {error.message}
    </div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes &&
        anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default App;
