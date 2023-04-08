export interface Course {
  name: string;
  exerciseCount: number;
}

export interface ContentProps {
  courseParts: Course[];
}

export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartDescription extends CoursePartBase {
  description: string;
  requirements?: string[];
}

export interface CoursePartBasic extends CoursePartDescription {
  kind: "basic";
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

export interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background";
}

export interface CoursePartSpecial extends CoursePartDescription {
  kind: "special";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;
