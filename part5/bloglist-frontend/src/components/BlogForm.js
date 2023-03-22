import React from "react";

const BlogForm = ({
  handleBlogCreate,
  title,
  author,
  url,
  setTitle,
  setAuthor,
  setUrl,
}) => {
  return (
    <form onSubmit={handleBlogCreate}>
      <div>
        <label htmlFor="title">title:</label>{" "}
        <input
          id="title"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder="type the title here"
        />
      </div>
      <div>
        <label htmlFor="author">author:</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          placeholder="type the author here"
        />
      </div>
      <div>
        <label htmlFor="url">url:</label>
        <input
          id="url"
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          placeholder="type the url here"
        />
      </div>

      <button type="submit">submit</button>
    </form>
  );
};

export default BlogForm;
