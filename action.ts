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
