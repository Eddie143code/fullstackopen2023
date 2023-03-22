import React from "react";
import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    //e.preventDefault();
    let value = e.target.value;
    dispatch(filterChange(value));
  };
  return (
    <div>
      Filter <input name="filter" onChange={handleChange} />
    </div>
  );
};

export default Filter;
