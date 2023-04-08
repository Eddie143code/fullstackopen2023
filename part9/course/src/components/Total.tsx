import React from "react";

interface Course {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courseParts: Course[];
}

const Total = ({ courseParts }: ContentProps) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

export default Total;
