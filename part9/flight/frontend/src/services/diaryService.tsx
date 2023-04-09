import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../Types";

const baseUrl = "http://localhost:3001/api/diaries";

export const getAll = async () => {
  const entries = await axios.get<DiaryEntry[]>(baseUrl);
  return entries.data;
};

export const addEntry = async (entry: NewDiaryEntry) => {
  const entryPost = await axios.post(baseUrl, entry);
  return entryPost.data;
};
