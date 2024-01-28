"use client";

import { useClerk, useSignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export default function Page({
  searchParams,
}: {
  searchParams: { redirect_url: string };
}) {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  const { isSignedIn, user } = useUser();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const result = await signIn?.create({
        identifier: emailAddress,
        password,
      });

      if (result?.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push(searchParams.redirect_url);
      } else {
        /*Investigate why the login hasn't completed */
      }
    } catch (err: any) {
      toast({
        title: err.errors[0].longMessage,
        variant: "destructive",
      });
      //   console.error("error", err.errors[0].longMessage);
    }
  };
  return (
    <>
      <div className="w-full min-h-[700px]    mt-5 flex items-center justify-center">
        <Card className="flex flex-col items-center min-w-[500px] ">
          <CardHeader className="font-bold text-3xl text-primary">
            SignIn
          </CardHeader>
          <CardContent>
            <form className="max-w-md flex flex-col gap-5 min-w-[500px] ">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Username</Label>
                <Input
                  onChange={(e) => setEmailAddress(e.target.value)}
                  id="email"
                  name="email"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                />
              </div>
              <Button
                onClick={async (e) => {
                  await handleSubmit(e);
                  router.refresh();
                }}
              >
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
