"use client";
import { Task, TaskWithoutKey } from "@/types";
import { useToast } from "./ui/use-toast";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import { FormLabelArray } from "@/constants";
import { FormComponent } from "./FormComponent";
import { createTask } from "@/action";

export const AddTaskForm = ({ email }: { email: string }) => {
  const initialState: TaskWithoutKey = {
    email: email,

    duration: "",
    name: "",
    priority: "important",
    type: "task",
    urgency: "not urgent",
  };
  const { toast } = useToast();
  const form = useForm<TaskWithoutKey>({
    defaultValues: initialState,
  });
  const [disable, setDisable] = useState(false);
  const router = useRouter();
  const onSubmit = async (values: TaskWithoutKey) => {
    const data = { ...values, completed: false };
    setDisable(true);
    try {
      const result = await createTask({ task: data });

      console.log(await result.json());

      if (result.ok) {
        setDisable(false);
        toast({
          title: "Product Succesfully Added",
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
          {FormLabelArray.map((formLabel) => {
            return (
              <div key={formLabel.name} className="w-2/5 mb-2">
                <FormComponent form={form} formLabel={formLabel} />
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
