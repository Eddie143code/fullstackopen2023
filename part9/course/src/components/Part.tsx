import React from "react";
import { CoursePart } from "../Types";

interface PartProps {
  course: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ course }: PartProps) => {
  switch (course.kind) {
    case "basic":
      return (
        <div>
          <p>
            {course.name} {course.exerciseCount}
          </p>
          <p>{course.description}</p>
        </div>
      );

    case "group":
      return (
        <div>
          <p>
            {course.name} {course.exerciseCount}
          </p>
          <p></p>
          <p>Group Projects: {course.groupProjectCount}</p>
        </div>
      );

    case "background":
      return (
        <div>
          <p>
            {course.name} {course.exerciseCount}
          </p>
          <p>Background material: {course.backgroundMaterial}</p>
        </div>
      );

    case "special":
      return (
        <div>
          <p>
            {course.name} {course.exerciseCount}
          </p>
          <p>{course.description}</p>
          {course.requirements &&
            course.requirements.map((r) => {
              return r;
            })}
        </div>
      );

    default:
      return assertNever(course);
  }
};

export default Part;
