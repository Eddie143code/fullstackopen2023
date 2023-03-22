import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAll = async () => {
  const res = await axios.get(baseUrl);

  return res.data;
};

export const createAnecdote = async (anec) => {
  const res = await axios.post(baseUrl, { content: anec.content, votes: 0 });

  return res.data;
};

export const voteInc = async (anec) => {
  const { id } = anec;

  const anecdote = {
    ...anec,
    votes: anec.votes + 1,
  };
  const res = await axios.patch(`${baseUrl}/${id}`, anecdote);
  return res.data;
};
