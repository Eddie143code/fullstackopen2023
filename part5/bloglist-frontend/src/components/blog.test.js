import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
describe("Blog", () => {
  const blog = {
    id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user: {
      name: "Peter",
    },
  };
  const { container } = render(<Blog blog={blog} />);
  test("rendering a blog initially has only title and author", () => {
    const { container } = render(<Blog blog={blog} />);
    const div = container.querySelector(".blog");
    expect(div).toHaveTextContent(blog.title);
    expect(div).toHaveTextContent(blog.author);
    expect(div).not.toHaveTextContent(blog.url);
    expect(div).not.toHaveTextContent(blog.likes);
  });
  test("shows url and likes when show button clicked", async () => {
    const { container } = render(<Blog blog={blog} />);
    const user = userEvent.setup();
    const button = container.querySelector(".show");
    await user.click(button);

    const div = container.querySelector(".blog");
    expect(div).toHaveTextContent(blog.url);
    expect(div).toHaveTextContent(blog.likes);
  });
  test("like button clicked twitce, the event handler is called twice", async () => {
    const mockHandler = jest.fn();
    const { container } = render(
      <Blog blog={blog} updateLikes={mockHandler} />
    );

    const user = userEvent.setup();
    const buttonShow = container.querySelector(".show");
    await user.click(buttonShow);

    const buttonLike = container.querySelector(".like");
    await user.click(buttonLike);
    await user.click(buttonLike);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});

describe("BlogForm", () => {
  test("Submit a BlogForm with inputs", async () => {
    const formHandler = jest.fn((e) => e.preventDefault());
    const titleHandler = jest.fn();
    const authorHandler = jest.fn();
    const urlHandler = jest.fn();
    const { container } = render(
      <BlogForm
        handleBlogCreate={formHandler}
        setTitle={titleHandler}
        setAuthor={authorHandler}
        setUrl={urlHandler}
      />
    );
    const user = userEvent.setup();

    const title = screen.getByPlaceholderText("type the title here");
    const author = screen.getByPlaceholderText("type the author here");
    const url = screen.getByPlaceholderText("type the url here");
    const submit = screen.getByText("submit");

    screen.debug(submit);
    /*user.change(title, {
      target: { value: 'testing-title' },
    })

    user.change(author, {
      target: { value: 'testing-author' },
    })

    user.change(url, {
      target: { value: 'testing-url' },
    }) */

    await user.type(title, "testing-title");
    await user.type(author, "testing-author");
    await user.type(url, "testing-url");
    await user.click(submit);
    console.log(titleHandler.mock.calls[0]);
    expect(formHandler.mock.calls).toHaveLength(1);
    expect(
      titleHandler.mock.calls[[titleHandler.mock.calls.length - 1]][0]
    ).toBe("testing-title");
    expect(
      authorHandler.mock.calls[[authorHandler.mock.calls.length - 1]][0]
    ).toBe("testing-author");
    expect(urlHandler.mock.calls[urlHandler.mock.calls.length - 1][0]).toBe(
      "testing-url"
    );
  });
});
