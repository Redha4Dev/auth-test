import { ReactElement, useState } from "react";

export function useMultistepForm(steps : ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function nextStep() {
    setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  }
  function prevStep() {
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  }
    function goToStep(index : number) {
        setCurrentStepIndex(Math.max(0, Math.min(index, steps.length - 1)));
    }

  return {
    currentStepIndex,
    step : steps[currentStepIndex],
    nextStep,
    prevStep,
    goToStep,
  }
}