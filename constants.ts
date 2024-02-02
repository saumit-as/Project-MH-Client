import { FormProp, HabitFormProp } from "./types";

export const FormLabelArray: FormProp[] = [
  { label: "Name of the Task", name: "name", type: "text" },
  { label: "Time required to complete", name: "duration", type: "text" },
  {
    label: "Urgency",
    name: "urgency",
    type: "radio",
    options: [{ Urgent: "urgent" }, { "Not Urgent": "not urgent" }],
  },
  {
    label: "Priority",
    name: "priority",
    type: "radio",
    options: [{ Important: "important" }, { "Not Important": "not important" }],
  },
];

export const habitFormLabel: HabitFormProp[] = [
  { label: "Name", name: "name" },
  { label: "Start Date", name: "date" },
  { label: "Time Required", name: "duration" },
];
