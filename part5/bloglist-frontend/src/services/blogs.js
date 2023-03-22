import axios from "axios";
const baseUrl = "http://localhost:3001/api/blogs";

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async (blog, user) => {
  const config = {
    headers: { Authorization: user.token },
  };

  const request = await axios.post(baseUrl, blog, config);
  return request.data;
};

const update = async (blog) => {
  console.log(blog);

  const request = await axios.put(`${baseUrl}/${blog.id}`, blog);
  return request.data;
};

const deleteBlog = async (blog, user) => {
  console.log("blog: ", blog);
  console.log("user: ", user);
  const config = {
    headers: { Authorization: user.token },
  };
  await axios.delete(`${baseUrl}/${blog.id}`, config);
};
// eslint-disable-next-line no-use-before-define
export default { getAll, create, update, deleteBlog };
