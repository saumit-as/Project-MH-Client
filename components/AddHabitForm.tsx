"use client";
import { HabitForForm, Task, TaskWithoutKey } from "@/types";
import { useToast } from "./ui/use-toast";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import { FormLabelArray, habitFormLabel } from "@/constants";
import { FormComponent } from "./FormComponent";
import { createHabit, createTask } from "@/action";
import { HabitFormComponent } from "./HabitFormComponent";

export const AddHabitForm = ({ email }: { email: string }) => {
  const initialState: HabitForForm = {
    name: "",
    date: "",
    duration: "",
  };
  const { toast } = useToast();
  const form = useForm<HabitForForm>({
    defaultValues: initialState,
  });
  const [disable, setDisable] = useState(false);
  const router = useRouter();
  const onSubmit = async (values: HabitForForm) => {
    const data = { ...values };
    setDisable(true);
    try {
      const result = await createHabit({
        ...data,
        email: email,
        streak: 0,
        lastCompleted: "",
      });

      console.log(await result.json());

      if (result.ok) {
        setDisable(false);
        toast({
          title: "Habit Added SuccessFully",
        });

        router.push("/dashboard");
      } else {
        setDisable(false);
        toast({
          title: "Something Went Wrong",
          variant: "destructive",
        });
      }
    } catch (error) {
      setDisable(false);
      toast({
        title: "Something Went Wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col p-4 rounded border"
      >
        <div className="flex flex-row justify-around flex-wrap w-full">
          {habitFormLabel.map((formLabel) => {
            return (
              <div key={formLabel.name} className="w-2/5 mb-2">
                <HabitFormComponent form={form} formLabel={formLabel} />
              </div>
            );
          })}
        </div>

        <Button className="w-28 mx-auto" disabled={disable} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};
