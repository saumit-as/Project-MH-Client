// "use server";
import OpenAI from "openai";
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
    `https://api.api-ninjas.com/v1/quotes?=${category}`,
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

export const getEmotion = async (diaryData: string) => {
  console.log(diaryData);
  const data = fetch(`${process.env.db}/emotion`, {
    cache: "no-store",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(diaryData),
  });
  return (await data).json();
};

export const getAdvice = async (promt: string) => {
  console.log("gpt hit");
  const openai = new OpenAI({
    apiKey: "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",
    dangerouslyAllowBrowser: true,
  });
  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        content: `The following is my diary entry of today. please read the contents and tell me ways to improve my life as a friend is telling to me. Also don't complete the sentences just give advice. Don't give in points just give me in paragraphs. Keep the advice in 5 lines. ${promt}`,
        role: "user",
      },
    ],
    temperature: 0.7,
    stream: false,
  });

  return res.choices[0].message.content as string;
};

export const setScore = async ({
  category,
  score,
  email,
}: {
  category: string;
  score: number;
  email: string;
}) => {
  const data = fetch(`${process.env.db}/user/setScore`, {
    cache: "no-store",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category, score, email }),
  });

  return true;
};
