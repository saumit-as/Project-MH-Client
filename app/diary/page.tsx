import { getDiaryData } from "@/action";
import { DiaryWrapper } from "@/components/RscWrappers/DiaryWrapper";
import { currentUser } from "@clerk/nextjs";

const Diary = async () => {
  const user = await currentUser();
  const initialDate = await getDiaryData({
    key:
      (user?.emailAddresses[0].emailAddress || "") + new Date().toDateString(),
  });

  return (
    <DiaryWrapper
      email={user?.emailAddresses[0].emailAddress || ""}
      initialDate={initialDate}
    />
  );
};

export default Diary;
