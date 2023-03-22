import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const res = await axios.get(baseUrl);

  return res.data;
};

const createAnec = async (anec) => {
  const data = { content: anec, votes: 0 };
  const res = await axios.post(baseUrl, data);

  return res.data;
};

const voteUpdate = async (anec) => {
  console.log("in voteupdate");
  const id = anec.id;
  const votes = { votes: anec.votes + 1 };

  const res = await axios.patch(`${baseUrl}/${id}`, votes);
  return res.data;
};

export default { getAll, createAnec, voteUpdate };
