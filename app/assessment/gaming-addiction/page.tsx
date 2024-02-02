import QuestionTemplate from "@/components/QuestionTemplate";
import { AssessementQns } from "@/types";

async function getData() {
  const res = await fetch(`${process.env.db}/questions/gaming-addiction`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const AddictionAssessment = async () => {
  const assessmentData: AssessementQns = await getData();
  return (
    <div className="mt-8 flex justify-center">
      {assessmentData && <QuestionTemplate assessmentData={assessmentData} />}
    </div>
  );
};

export default AddictionAssessment;
