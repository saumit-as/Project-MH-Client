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
import { completeTask, deleteTask } from "@/action";

export const TaskView = ({ tasks }: { tasks: Task[] }) => {
  const router = useRouter();
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <p>Today&apos; Tasks</p>
          <div className="flex gap-4">
            <Button
              onClick={() => {
                router.push("/add/task");
              }}
            >
              Add Task
            </Button>
            <Button
              onClick={() => {
                router.refresh();
              }}
            >
              <RefreshCw />
            </Button>
          </div>
        </div>
      </CardHeader>
      {tasks.length > 0 ? (
        <CardContent>
          <Accordion type="single" collapsible>
            {tasks.map((task, index) => {
              return (
                <AccordionItem key={task.key} value={task.key}>
                  <AccordionTrigger
                    className={task.completed ? "line-through	" : ""}
                  >
                    {task.name}
                  </AccordionTrigger>
                  <AccordionContent className="flex gap-2">
                    <Button
                      onClick={async () => {
                        await completeTask(task);
                        router.refresh();
                      }}
                      disabled={task.completed}
                    >
                      Complete Task
                    </Button>
                    <Button
                      onClick={async () => {
                        const data = await deleteTask(task.key);
                        console.log(data);
                        router.refresh();
                      }}
                    >
                      Delete Task
                    </Button>
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
