import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/Anecdotes";

const initialState = [];

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    voteFor(state, action) {
      const id = action.payload.id;
      const anec = action.payload;
      console.log(action.payload);
      const allAnec = state.map((anecdote) => {
        return anecdote.id === id ? anec : anecdote;
      });

      return allAnec;
    },
    appendAnecdotes(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});
export const { voteFor, setAnecdotes, appendAnecdotes } = anecdoteSlice.actions;

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anec = await anecdoteService.createAnec(content);
    dispatch(appendAnecdotes(anec));
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anec = await anecdoteService.getAll();

    dispatch(setAnecdotes(anec));
  };
};

export const voteIncrease = (anecdote) => {
  return async (dispatch) => {
    const anec = await anecdoteService.voteUpdate(anecdote);
    dispatch(voteFor(anec));
  };
};

export default anecdoteSlice.reducer;
