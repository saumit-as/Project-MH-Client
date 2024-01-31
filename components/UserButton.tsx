"use client";

import { useUser } from "@clerk/nextjs";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "./ui/button";

export const UserButton = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  if (!isLoaded) {
    return <Button disabled>Loading</Button>;
  }

  if (isSignedIn) {
    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>{user.username}</MenubarTrigger>
          <MenubarContent>
            <MenubarItem
              onClick={() => {
                signOut(() => router.push("/"));
              }}
            >
              Sign Out
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  } else {
    return <Button>Login</Button>;
  }
};
