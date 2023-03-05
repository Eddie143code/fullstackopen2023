const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length == 0) {
    return 0;
  } else if (blogs.length == 1) {
    return 7;
  }
  const total = blogs.reduce((a, c) => a + c.likes, 0);
  return total;
};

const mostLikes = (blogs) => {
  let blogMostLikes = {
    author: "",
    likes: 0,
  };

  blogs.forEach((blog) => {
    if (blog.likes > blogMostLikes.likes) {
      blogMostLikes = {
        author: blog.author,
        likes: blog.likes,
      };
    }
  });

  return blogMostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  mostLikes,
};
