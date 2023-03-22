const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

const counterReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "GOOD":
      let good = state.good + 1;
      state = {
        good,
        ok: state.ok,
        bad: state.bad,
      };
      return state;
    case "OK":
      let ok = state.ok + 1;
      state = {
        good: state.good,
        ok,
        bad: state.bad,
      };
      return state;
    case "BAD":
      let bad = state.bad + 1;
      state = {
        good: state.good,
        ok: state.ok,
        bad,
      };
      return state;
    case "ZERO":
      state = initialState;
      return state;
    case "DO_NOTHING":
      return state;
    default:
      return state;
  }
};

export default counterReducer;
