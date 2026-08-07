import { useEffect, useState } from "react";

const TOTAL_STEPS = 8;

export default function useAnalysisProgress(
  loading
) {
  const [currentStep, setCurrentStep] =
    useState(0);

  const [progress, setProgress] =
    useState(0);

  useEffect(() => {
    if (!loading) {
      setCurrentStep(0);
      setProgress(0);
      return;
    }

    let step = 0;

    const interval = setInterval(() => {
      step++;

      if (step <= TOTAL_STEPS) {
        setCurrentStep(step);

        setProgress(
          Math.round(
            (step / TOTAL_STEPS) * 100
          )
        );
      }

      if (step >= TOTAL_STEPS) {
        clearInterval(interval);
      }
    }, 700);

    return () =>
      clearInterval(interval);
  }, [loading]);

  return {
    currentStep,
    progress,
  };
}