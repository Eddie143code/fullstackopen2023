import React from "react";

const Filter = ({ filterChange }) => {
  return (
    <div>
      filter show with <input onChange={filterChange} />
    </div>
  );
};

export default Filter;
