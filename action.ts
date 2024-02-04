// "use server";
import {
  AssessementQns,
  DairyData,
  Habit,
  Quote,
  Task,
  TaskWithoutKey,
} from "./types";

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

  console.log(data);

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

export const getQuote = async (category: string) => {
  const response = await fetch(
    `https://api.api-ninjas.com/v1/quotes?category=${category}`,
    {
      method: "GET",
      headers: { "X-Api-Key": `${process.env.QUOTES_API_KEY}` },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const quoteData = (await response.json()) as unknown as Quote[];

  return quoteData;
};

export const getDiaryData = async ({ key }: { key: string }) => {
  console.log(key);
  const tasks = await fetch(`${process.env.db}/diary/get/${key}`);
  return (await tasks.json()) as unknown as DairyData;
};

export const saveDiaryData = async (diaryData: DairyData) => {
  const data = await fetch(`${process.env.db}/diary/add`, {
    cache: "no-store",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(diaryData),
  });

  return data;
};
