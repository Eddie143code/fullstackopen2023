import React from "react";

const Notification = ({ notification }) => {
  const notiStyle = notification.includes("Added")
    ? {
        color: "green",
        fontStyle: "italic",
        fontSize: "20px",
        paddingLeft: "10px",
        background: "#E8E8E8",
        borderWidth: "2px",
        borderColor: "green",
        borderStyle: "solid",
      }
    : {
        color: "red",
        fontStyle: "italic",
        fontSize: "20px",
        paddingLeft: "10px",
        background: "#E8E8E8",
        borderWidth: "2px",
        borderColor: "red",
        borderStyle: "solid",
      };
  return (
    <div style={notiStyle}>
      <br />
      <em>{notification}</em>
    </div>
  );
};

export default Notification;
