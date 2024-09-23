import OverviewContent from "@/components/OverviewContent";
import Quotes from "@/components/Quotes";
import QuotesTemplate from "@/components/QuotesTemplate";
import { TaskView } from "@/components/TaskView";
import { Task } from "@/types";
import { currentUser } from "@clerk/nextjs";

const getData = async (email: string) => {
  const tasks = await fetch(`${process.env.db}/tasks/get/${email}`);
  return (await tasks.json()) as unknown as Task[];
};
const page = async () => {
  const user = await currentUser();
  const tasks = await getData(user?.emailAddresses[0].emailAddress || "");

  return (
    <div className="">
      <div className="flex justify-center">
        <Quotes />
      </div>
      <div className="mt-3">{/* <OverviewContent /> */}</div>
      <section className="my-8 grid grid-cols-2 gap-5">
        <TaskView tasks={tasks} />
      </section>
    </div>
  );
};

export default page;
