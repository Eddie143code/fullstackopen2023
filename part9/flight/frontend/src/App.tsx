import Form from "./components/Form";
import DiaryEntries from "./components/DiaryEntries";
import { useEffect, useState } from "react";
import { getAll } from "./services/diaryService";
import { DiaryEntry } from "./Types";

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  useEffect(() => {
    getAll().then((d) => setEntries(d));
  }, []);
  return (
    <div>
      <Form setEntries={setEntries} entries={entries} />
      <DiaryEntries entries={entries} />
    </div>
  );
};

export default App;
