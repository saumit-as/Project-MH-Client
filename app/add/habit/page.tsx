import { AddHabitForm } from "@/components/AddHabitForm";
import { AddTaskForm } from "@/components/AddTaskForm";
import { currentUser } from "@clerk/nextjs";

const AddHabit = async () => {
  const user = await currentUser();
  return (
    <div className="container">
      <AddHabitForm email={user?.emailAddresses[0].emailAddress || ""} />
    </div>
  );
};

export default AddHabit;
