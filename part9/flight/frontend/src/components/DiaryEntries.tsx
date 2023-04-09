import { DiaryEntry } from "../Types";

interface DiaryEntriesProps {
  entries: DiaryEntry[];
}

const DiaryEntries = ({ entries }: DiaryEntriesProps) => {
  return (
    <div>
      <h2>DiaryEntries</h2>
      <button onClick={() => console.log(entries)}>log</button>
      {entries.map((entry) => {
        return (
          <div key={entry.id}>
            <h4>{entry.date}</h4>
            <div>
              <p>{entry.visibility}</p>
              <p>{entry.weather}</p>
              <p>{entry.comment}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DiaryEntries;
