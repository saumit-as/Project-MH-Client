import QuestionTemplate from "@/components/QuestionTemplate";
import { AssessementQns } from "@/types";
import { currentUser } from "@clerk/nextjs";

async function getData() {
  const res = await fetch(`${process.env.db}/questions/gaming-addiction`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const AddictionAssessment = async () => {
  const user = await currentUser();
  const assessmentData: AssessementQns = await getData();
  return (
    <div className="mt-8 flex justify-center">
      {assessmentData && (
        <QuestionTemplate
          email={user?.emailAddresses[0].emailAddress || ""}
          assessmentData={assessmentData}
        />
      )}
    </div>
  );
};

export default AddictionAssessment;
