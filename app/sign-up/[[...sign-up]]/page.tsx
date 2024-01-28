"use client";
import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useToast } from "@/components/ui/use-toast";

export default function SignUpForm() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();
  // start the sign up process.
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
        username,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.errors[0]?.longMessage,
      });
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async (e: any) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        /*  investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        console.log(completeSignUp);
        router.push("/");
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.errors?.message,
      });
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <div>
      {!pendingVerification && (
        <div className="w-full h-screen flex justify-center items-center font-[sans-serif]">
          <Card className="shadow-2xl sm:min-w-[400px]  m-2 px-3 py-3">
            <CardHeader className="my-3">
              <CardTitle className="font-semibold font-[sans-serif]">
                Sign up
              </CardTitle>
              <CardDescription>to continue to Project-MH</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-2">
                <div>
                  <Label htmlFor="username" className="text-sm">
                    Username
                  </Label>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
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
                    {isLoading ? "Signing up..." : "Sign up"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
      {pendingVerification && (
        // <div>
        //   <form>
        //     <input
        //       value={code}
        //       placeholder="Code..."
        //       onChange={(e) => setCode(e.target.value)}
        //     />
        //     <button onClick={onPressVerify}>Verify Email</button>
        //   </form>
        // </div>
        <div className="w-full min-h-[700px]    mt-5 flex items-center justify-center">
          <Card className="flex flex-col items-center min-w-[500px] ">
            <CardHeader className="font-bold text-3xl text-primary">
              Verify Code
            </CardHeader>
            <CardContent>
              <form className="max-w-md flex flex-col gap-5 min-w-[500px] ">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="OTP">Enter OTP</Label>
                  <Input
                    onChange={(e) => setCode(e.target.value)}
                    id="otp"
                    name="otp"
                    type="text"
                  />
                </div>

                <Button
                  onClick={async (e) => {
                    await onPressVerify(e);
                    router.refresh();
                  }}
                >
                  Verify
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
