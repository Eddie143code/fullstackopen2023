import axios from "axios";
const baseUrl = "http://localhost:3001/api/users";

const login = async (user) => {
  const res = await axios.post(`${baseUrl}/login`, user);

  return res.data;
};

export default { login };
