import { HTMLInputTypeAttribute } from "react";

export interface User {
  username: string;
  key: string;
  userId: string;
  profileCompleted: boolean;
  gamingAddiction: number;
  anxiety: number;
  depression: number;
  //   profileId: string;
}

export interface Profile {
  key: string;
  assesmentCompleted: boolean;
  suggestedAreas: AreaOfImprovements[] | AreaOfImprovements;
  areaOfImprovement: AreaOfImprovements[] | AreaOfImprovements;
}

type AreaOfImprovements = "None" | "Anxiety" | "Depression" | "Addiction";

export interface Habit {
  key: string;
  streak: number;
  email: string;
  lastCompleted: string;
  name: string;
  date: string;
  duration: string;
}

export interface HabitForForm
  extends Omit<Habit, "key" | "lastCompleted" | "streak" | "email"> {}

// export interface TaskSet {
//   key: string;
//   email: string;
//   tasks: Tasks[];
// }

export interface Task {
  key: string;
  email: string;
  name: string;
  urgency: "urgent" | "not urgent";
  priority: "important" | "not important";
  duration: string;
  completed: boolean;
  type: "task" | "habit";
}
export interface TaskWithoutKey extends Omit<Task, "key" | "completed"> {}

export type FormProp = {
  label: string;
  name: keyof TaskWithoutKey;
} & ({ type: "radio"; options: Record<string, string>[] } | { type: "text" });

export type HabitFormProp = {
  label: string;
  name: keyof HabitForForm;
};
// type option = {};
// type T2 = Extract<HTMLInputTypeAttribute, "text" | "radio">

export type AssessementQns = {
  category: string;
  key: string;
  options: string[];
  questions: string[];
};

export type Quote = {
  quote: string;
  author: string;
  category: string;
};

export interface DairyData {
  key: String;
  data: string;
  advice: string;
}
