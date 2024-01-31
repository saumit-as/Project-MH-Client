import { AddTaskForm } from "@/components/AddTaskForm";
import { currentUser } from "@clerk/nextjs";

const AddTask = async () => {
  const user = await currentUser();
  return (
    <div className="container">
      <AddTaskForm email={user?.emailAddresses[0].emailAddress || ""} />
    </div>
  );
};

export default AddTask;
