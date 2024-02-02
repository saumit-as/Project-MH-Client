import { Habit, Task, TaskWithoutKey } from "./types";

export const createProfile = async ({
  email,
  username,
  userId,
}: {
  email: string;
  username: string;
  userId: string;
}) => {
  const data = await fetch(`${process.env.db}/user/create`, {
    cache: "no-store",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, username, userId }),
  });

  return data;
};

export const createTask = async ({ task }: { task: TaskWithoutKey }) => {
  const data = await fetch(`${process.env.db}/tasks/create`, {
    cache: "no-store",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  return data;
};

export const completeTask = async (task: Task) => {
  const data = await fetch(`${process.env.db}/tasks/complete`, {
    cache: "no-store",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  return data;
};

export const deleteTask = async (key: string) => {
  const data = await fetch(`${process.env.db}/tasks/delete/${key}`, {
    cache: "no-store",
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
};

export const createHabit = async (habit: Omit<Habit, "key">) => {
  const data = await fetch(`${process.env.db}/habits/create`, {
    cache: "no-store",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(habit),
  });

  return data;
};
