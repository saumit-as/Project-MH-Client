"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroupItem, RadioGroup } from "@radix-ui/react-radio-group";
const BodyMap = () => {
  const setHabits = (habit: string) => {
    setNegativeHabits([...negativeHabits, habit]);
  };
  const [negativeHabits, setNegativeHabits] = useState<string[]>([]);
  const [positiveHabits, setPositiveHabits] = useState<string[]>([]);
  const textRef = useRef();
  const form = useForm({
    defaultValues: {
      habit: "",
      side: "",
    },
  });

  function onSubmit(data: any) {
    console.log(data);
  }
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex gap-5">
        <div className="flex flex-col gap-3">
          <Card>
            <CardHeader>
              <CardTitle>Negative Habits</CardTitle>
            </CardHeader>
            <CardContent>
              {negativeHabits.map((habit) => {
                return <p>{habit}</p>;
              })}
            </CardContent>
          </Card>
        </div>
        <div>2</div>
        <div>3</div>
      </div>
      <div className=" max-w-sm flex gap-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="habit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Habit</FormLabel>
                  <FormControl>
                    <Input placeholder="habit" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="side"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Notify me about...</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="left" />
                        </FormControl>
                        <FormLabel className="font-normal">NEGATIVE</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="right" />
                        </FormControl>
                        <FormLabel className="font-normal">POSITIVE</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BodyMap;
