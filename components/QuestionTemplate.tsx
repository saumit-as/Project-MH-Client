"use client";
import { AssessementQns } from "@/types";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const QuestionTemplate = ({
  assessmentData,
}: {
  assessmentData: AssessementQns;
}) => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>(
    Array(assessmentData.questions.length).fill(0)
  );

  const handleOptionSelect = (questionIndex: number, optionIndex: number) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[questionIndex] = optionIndex + 1;
    setSelectedOptions(newSelectedOptions);
  };

  const calculateTotalMarks = (): number => {
    const totalScore = selectedOptions.reduce(
      (total, optionIndex) => total + optionIndex,
      0
    );
    const maxPossibleScore =
      assessmentData.options.length * assessmentData.questions.length;
    const percentageScore = (totalScore / maxPossibleScore) * 100;
    return percentageScore;
  };

  return (
    <div className="flex justify-center border h-[500px] py-8 rounded-lg sm:w-[1200px]">
      {assessmentData && (
        <div>
          <div>
            <p className="font-semibold text-xl text-start">
              Understanding your {assessmentData.category}
            </p>
            <p className=" text-muted-foreground text-sm">
              Delve into the Following Questions
            </p>
          </div>
          <div className="mt-24">
            <Carousel className="w-[950px]">
              <CarouselContent>
                {assessmentData.questions.map((question, questionIndex) => (
                  <CarouselItem
                    key={questionIndex}
                    className="flex justify-center"
                  >
                    <div>
                      <p className="text-2xl mb-5">
                        <span className="text-lg">{questionIndex + 1}. </span>
                        {question}
                      </p>
                      <div className="flex justify-start">
                        <div className="grid grid-cols-2 gap-8">
                          {assessmentData.options.map((option, optionIndex) => (
                            <div key={optionIndex}>
                              <label>
                                <input
                                  type="radio"
                                  name={`question-${questionIndex}`}
                                  className="mr-2"
                                  value={optionIndex + 1}
                                  checked={
                                    selectedOptions[questionIndex] ===
                                    optionIndex + 1
                                  }
                                  onChange={() =>
                                    handleOptionSelect(
                                      questionIndex,
                                      optionIndex
                                    )
                                  }
                                />
                                {option}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
                <CarouselItem>
                  <p className="text-center">
                    Level of {assessmentData.category} you have {"->"}{" "}
                    {calculateTotalMarks()}
                    {"%"}
                  </p>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionTemplate;
