const listHelper = require("../utils/list_helper");
const { blogList } = require("../utils/Bloglist");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  const blogs = blogList;
  const noBlogs = [];
  const blog = [blogList[0]];

  test("of empty list is zero", () => {
    const result = listHelper.totalLikes(noBlogs);
    expect(result).toBe(0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(blog);
    expect(result).toBe(7);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });

  test("and the author of the blog with the most likes", () => {
    const result = listHelper.mostLikes(blogs);
    expect(result.author).toBe("Edsger W. Dijkstra");
    expect(result.likes).toBe(12);
  });
});
