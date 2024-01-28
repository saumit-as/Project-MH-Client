"use client";

import { useClerk, useSignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Page({
  searchParams,
}: {
  searchParams: { redirect_url: string };
}) {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      <div className="w-full h-screen flex justify-center items-center font-[sans-serif]">
        <Card className="shadow-2xl sm:min-w-[400px]  m-2 px-3 py-3">
          <CardHeader className="my-3">
            <CardTitle className="font-semibold font-[sans-serif]">
              Sign in
            </CardTitle>
            <CardDescription>
              to continue to aasai-cashews-servcie
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-2">
              <div>
                <Label htmlFor="email" className="text-sm">
                  Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmailAddress(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-sm">
                  Password
                </Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <Button
                  className="min-w-full mt-2"
                  onClick={async (e) => {
                    await handleSubmit(e);
                    router.refresh();
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </div>
            </form>
            <div className="my-5">
              <Separator />
            </div>
            <p>
              Don&apos;t have an account, <Link href={"/sign-up"}>Sign up</Link>{" "}
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
