import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/users";
import getToken from "./services/token";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userTemp = await loginService.login({
        username,
        password,
      });

      if (userTemp) {
        setUser(userTemp);
        setUsername("");
        setPassword("");
        window.localStorage.setItem("user", JSON.stringify(userTemp));
        setMessage(`successfully logged in as ${userTemp.name}`);
        setTimeout(() => {
          setMessage("");
        }, 5000);
      }
    } catch (error) {
      console.log(error);
      setMessage(`error ${error}`);
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  const handleBlogCreate = async (event) => {
    event.preventDefault();
    try {
      const blogTemp = await blogService.create(
        {
          title,
          author,
          url,
        },
        { token: user.token }
      );
      setBlogs(blogs.concat(blogTemp));
      setTitle("");
      setAuthor("");
      setUrl("");
      setMessage(`successfully added "${blogTemp.title}"`);
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } catch (error) {
      console.log(error);
      setMessage(`error ${error}`);
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  const updateLikes = async (blog) => {
    try {
      const blogItem = {
        ...blog,
        likes: blog.likes + 1,
      };
      await blogService.update(blogItem, user);

      await blogService.getAll().then((blogs) => setBlogs(blogs));
    } catch (error) {
      setMessage("error " + error);
    }
  };

  const handleDelete = async (blog) => {
    await blogService.deleteBlog(blog, user);
    await blogService.getAll().then((blogs) => setBlogs(blogs));
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
    const loggedIn = window.localStorage.getItem("user");
    if (loggedIn) {
      const userTemp = JSON.parse(loggedIn);
      setUser(userTemp);
      getToken(userTemp);
    }
    console.log("render");
  }, [window.localStorage]);

  return (
    <div>
      <button onClick={() => console.log(user)}>log</button>
      {message && <Notification message={message} />}
      {!user ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <>
          <h1>{user.name}</h1>
          <button
            onClick={() => {
              window.localStorage.removeItem("user");
              setUser("");
            }}
          >
            logout
          </button>
          <Togglable buttonLabel={"create a blog"}>
            {" "}
            <BlogForm
              handleBlogCreate={handleBlogCreate}
              title={title}
              setTitle={setTitle}
              author={author}
              setAuthor={setAuthor}
              url={url}
              setUrl={setUrl}
            />
          </Togglable>
        </>
      )}

      <h2>blogs</h2>
      {blogs.map((blog) => {
        return (
          <Blog
            key={blog.id}
            blog={blog}
            updateLikes={updateLikes}
            handleDelete={handleDelete}
          />
        );
      })}
    </div>
  );
};

export default App;
