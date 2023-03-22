import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createStore } from "redux";
import counterReducer from "./reducer";

const store = createStore(counterReducer);
const App = () => {
  const [state, setState] = useState("");

  useEffect(() => {
    setState(() => store.getState());
  }, [store]);
  return (
    <div>
      <button onClick={() => store.dispatch({ type: "GOOD" })}>good</button>
      <button onClick={() => store.dispatch({ type: "OK" })}>ok</button>
      <button onClick={() => store.dispatch({ type: "BAD" })}>bad</button>
      <button onClick={() => store.dispatch({ type: "ZERO" })}>
        reset stats
      </button>
      <button onClick={() => console.log(state)}>log</button>
      <div>good: {state.good}</div>
      <div>ok: {state.ok}</div>
      <div>bad: {state.bad}</div>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
};

renderApp();
store.subscribe(renderApp);
