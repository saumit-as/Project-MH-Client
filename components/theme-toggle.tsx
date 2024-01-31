"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <Button
      onClick={() => {
        resolvedTheme === "dark" ? setTheme("light") : setTheme("dark");
      }}
      variant={"outline"}
      size={"icon"}
    >
      <MoonIcon className={resolvedTheme === "dark" ? "" : "hidden"} />
      <SunIcon className={resolvedTheme === "dark" ? "hidden" : ""} />
    </Button>
  );
};
