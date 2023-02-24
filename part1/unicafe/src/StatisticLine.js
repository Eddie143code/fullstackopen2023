import React from "react";

const StatisticLine = ({ text, value, percentage }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value} {percentage}
      </td>
    </tr>
  );
};

export default StatisticLine;
