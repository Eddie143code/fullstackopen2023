let token = null;
const getToken = (user) => {
  token = `Bearer ${user.token}`;
  user.token = token;
};

export default getToken;
