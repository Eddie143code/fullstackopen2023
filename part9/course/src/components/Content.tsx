import React from "react";
import Part from "./Part";
import { CoursePart } from "../Types";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((course: CoursePart) => (
        <div key={course.name}>
          <Part course={course} />
        </div>
      ))}
    </div>
  );
};

export default Content;
