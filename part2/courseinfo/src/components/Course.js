import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      {courses.map((course) => {
        const total = course.parts.reduce((a, c) => {
          return a + c.exercises;
        }, 0);
        console.log(total);
        return (
          <>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total sum={total} />
          </>
        );
      })}
    </div>
  );
};

export default Course;
