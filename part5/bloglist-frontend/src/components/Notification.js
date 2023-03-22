import React from "react";

const Notification = ({ message }) => {
  const notiStyle = !message.includes("error")
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
    <div className="message" style={notiStyle}>
      <br />
      <em>{message}</em>
    </div>
  );
};

export default Notification;
