import React from "react";
import { useMultistepForm } from "../components/ui/useMultistepForm";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import { Button } from "@/components/ui/button";
import { School, Shield, User } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { FormProvider } from "./Steps/FormContext";

const StepDescription = [
  "Personal Informations",
  "Kindergarten Informations",
  "Account Conformation",
];

function SignUp() {
  const { step, currentStepIndex, prevStep, nextStep } = useMultistepForm([
    <Step1 />,
    <Step3 />,
  ]);
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    nextStep();
  }
  return (
    <div className="flex flex-col gap-4 bg-muted items-center p-6 md:p-10 h-full min-h-screen">
      <div className="flex flex-col md:flex-row md:w-96 gap-4 rounded-2xl shadow-lg bg-[#f7f7f7] p-4">
        <div>
          <h1 className="font-semibold">Step :</h1>
          <p className="font-medium ">{StepDescription[currentStepIndex]}</p>
        </div>
        <div className="w-fit flex items-center justify-center">
          <div className="flex min-w-52 items-center w-full rounded-2xl text-3xl">
            <Button
              className={`rounded-full z-10  p-2 ${
                currentStepIndex >= 0
                  ? "border-[3px] border-violet-600"
                  : "border-none"
              }`}
              variant="outline"
              disabled={currentStepIndex < 0}
            >
              <User />
            </Button>
            <Progress value={currentStepIndex >= 1 ? 100 : 0} />
            <Button
              className={`rounded-full z-10  p-2 ${
                currentStepIndex >= 1
                  ? "border-[3px] border-violet-600"
                  : "border-none"
              }`}
              variant="outline"
              disabled={currentStepIndex < 1}
            >
              <Shield />
            </Button>
          </div>
        </div>
      </div>
      <FormProvider>
      <form onSubmit={onSubmit} className="flex flex-col gap-4 w-full md:w-96">
        {step}
        <div className="flex gap-4">
          <Button
            onClick={prevStep}
            disabled={currentStepIndex === 0}
            className="flex-1"
            variant="outline"
          >
            Previous
          </Button>
          <Button
            type="submit"
            className="flex-1"
            disabled={currentStepIndex === 1}
          >
            {currentStepIndex === 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </form>
      </FormProvider>
    </div>
  );
}

export default SignUp;
