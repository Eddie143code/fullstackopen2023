import React, {
  ChangeEvent,
  FormEvent,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { addEntry } from "../services/diaryService";
import { Visibility, Weather, NewDiaryEntry, DiaryEntry } from "../Types";

interface SetEntries
  extends React.Dispatch<React.SetStateAction<DiaryEntry[]>> {
  setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
}

interface FormProps {
  setEntries: Dispatch<SetStateAction<DiaryEntry[]>>;
  entries: DiaryEntry[];
}

const Form = ({ setEntries, entries }: FormProps) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState<Visibility>();

  const [weather, setWeather] = useState<Weather>();
  const [comment, setComment] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(date, visibility, comment, weather);
    const newEntry: NewDiaryEntry = {
      date,
      weather,
      visibility,
      comment,
    };
    const e = await addEntry(newEntry);
    const newList = entries.concat(e);
    setEntries(newList);
  };

  const handleVisibilityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVisibility(event.target.value as Visibility);
  };
  const handleWeatherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeather(event.target.value as Weather);
  };
  return (
    <div>
      <h2>Add new Entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <br />
        <div>
          <span>visibility: </span>
          <label htmlFor="great">great</label>
          <input
            type="radio"
            id="great"
            name="visibility"
            value="great"
            checked={visibility === "great"}
            onChange={handleVisibilityChange}
          />
          <label htmlFor="good">good</label>
          <input
            type="radio"
            id="good"
            name="visibility"
            value="good"
            checked={visibility === "good"}
            onChange={handleVisibilityChange}
          />
          <label htmlFor="ok">ok</label>
          <input
            type="radio"
            id="ok"
            name="visibility"
            value="ok"
            checked={visibility === "ok"}
            onChange={handleVisibilityChange}
          />
          <label htmlFor="poor">poor</label>
          <input
            type="radio"
            id="poor"
            name="visibility"
            value="poor"
            checked={visibility === "poor"}
            onChange={handleVisibilityChange}
          />
        </div>
        <br />
        <div>
          <span>weather: </span>
          <label htmlFor="sunny">sunny</label>
          <input
            type="radio"
            id="sunny"
            name="weather"
            value="sunny"
            checked={weather === "sunny"}
            onChange={handleWeatherChange}
          />
          <label htmlFor="rainy">rainy</label>
          <input
            type="radio"
            id="rainy"
            name="weather"
            value="rainy"
            checked={weather === "rainy"}
            onChange={handleWeatherChange}
          />
          <label htmlFor="cloudy">cloudy</label>
          <input
            type="radio"
            id="cloudy"
            name="weather"
            value="cloudy"
            checked={weather === "cloudy"}
            onChange={handleWeatherChange}
          />
          <label htmlFor="stormy">stormy</label>
          <input
            type="radio"
            id="stormy"
            name="weather"
            value="stormy"
            checked={weather === "stormy"}
            onChange={handleWeatherChange}
          />
          <label htmlFor="windy">windy</label>
          <input
            type="radio"
            id="windy"
            name="weather"
            value="windy"
            checked={weather === "windy"}
            onChange={handleWeatherChange}
          />
        </div>
        <br />
        <div>
          <label htmlFor="comment">comment</label>
          <input
            type="text"
            id="comment"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <br />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
