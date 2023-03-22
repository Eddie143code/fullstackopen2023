import { useContext, useEffect, useState } from "react";
import NotificationContext from "../NotificationContext";

const Notification = () => {
  const [message, setMessage] = useState("");
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  const [notification, dispatch] = useContext(NotificationContext);

  useEffect(() => {
    setMessage(notification);
    console.log(notification);
  }, [notification]);

  if (notification) {
    return <div style={style}>{notification}</div>;
  }
};

export default Notification;
