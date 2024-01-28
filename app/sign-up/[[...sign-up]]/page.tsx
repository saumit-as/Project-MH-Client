import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

export default function SignUpForm() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();
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
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
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
        router.push("/");
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <div>
      {!pendingVerification && (
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
