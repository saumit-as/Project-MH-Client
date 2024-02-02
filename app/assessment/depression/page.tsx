import QuestionTemplate from "@/components/QuestionTemplate";
import { AssessementQns } from "@/types";

async function getData() {
  const res = await fetch(`${process.env.db}/questions/depression`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const DepressionAssessment = async () => {
  const assessmentData: AssessementQns = await getData();
  console.log(assessmentData);

  return (
    <div className="mt-8 flex justify-center">
      {assessmentData && <QuestionTemplate assessmentData={assessmentData} />}
    </div>
  );
};

export default DepressionAssessment;
