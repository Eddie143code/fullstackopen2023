import { useState, useEffect } from "react";

const Blog = ({ blog, updateLikes, handleDelete }) => {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState("");
  useEffect(() => {
    const loggedIn = window.localStorage.getItem("user");
    const userTemp = JSON.parse(loggedIn);
    setUser(userTemp);
  }, [window.localStorage]);

  return (
    <>
      <div className="blog">
        {blog.title} {blog.author}{" "}
        <button className="show" onClick={() => setVisible(!visible)}>
          show
        </button>
        <button
          className="like"
          onClick={() => {
            updateLikes(blog);
          }}
        >
          like
        </button>
        <button onClick={() => handleDelete(blog)}>delete</button>
        <button onClick={() => console.log(user)}>log</button>
        {visible && (
          <>
            <div>url: {blog.url}</div>
            <div>likes: {blog.likes}</div>
            <div>title: {blog.title}</div>
            <div>created by:{blog.user.name}</div>
          </>
        )}
      </div>
    </>
  );
};

export default Blog;
