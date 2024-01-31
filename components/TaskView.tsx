"use client";
import { Task } from "@/types";
import { Card, CardContent, CardHeader } from "./ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

export const TaskView = ({ tasks }: { tasks: Task[] }) => {
  const router = useRouter();
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <p>Today's Tasks</p>
          <div className="flex gap-4">
            <Button
              onClick={() => {
                router.push("/add/task");
              }}
            >
              Add Task
            </Button>
            <Button>
              <RefreshCw />
            </Button>
          </div>
        </div>
      </CardHeader>
      {tasks.length > 0 ? (
        <CardContent>
          <Accordion type="single" collapsible>
            {tasks.map((task) => {
              return (
                <AccordionItem value={task.key}>
                  <AccordionTrigger>{task.name}</AccordionTrigger>
                  <AccordionContent>
                    <Button>Hi bro</Button>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      ) : (
        <CardContent>NO TASKS Found</CardContent>
      )}
    </Card>
  );
};
