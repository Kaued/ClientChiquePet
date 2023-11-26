import { Box, Flex, Progress, Step, StepDescription, StepIcon, StepIndicator, StepStatus, StepTitle, Stepper, Tooltip, useSteps } from "@chakra-ui/react"
import { finishOrderSliceValue, setStepOrder } from "../../features/finishOrder/finishOrderSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useEffect, useState } from "react";
import { StepOne } from "../../components/Steps/FinishOrder/StepOne";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import "./finishCart.scss";
import { StepTwo } from "../../components/Steps/FinishOrder/StepTwo";

export const FinishCart = () =>{

  const finishOrder: finishOrderSliceValue = useAppSelector((state)=>state.finishOrder);
  const dispatch = useAppDispatch();

  const steps = [
    { title: "Primeiro", description: "Nome & Email", component: <StepOne /> },
    { title: "Segundo", description: "Pagamento", component: <StepTwo /> },
    // { title: "Segundo", description: "Senha", component: <StepTwo /> },
    // {
    //   title: "Terceiro",
    //   description: "Data de Nascimento",
    //   component: <StepThree />,
    // },
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: finishOrder.step,
    count: steps.length,
  });

  const max = steps.length - 1;
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [beforeStep, setBeforeStep] = useState<number>(activeStep - 1);

  useEffect(() => {
    setBeforeStep(activeStep);
    setActiveStep(finishOrder.step);
  }, [finishOrder.step]);

  useEffect(() => {
    let state = progressPercent;

    if (beforeStep > activeStep) {
      const removeProgress = setInterval(() => {
        setProgressPercent((count) => count - 1);
        state -= 1;
        if (state <= (activeStep / max) * 100) {
          clearInterval(removeProgress);
        }
      }, 10);
    } else {
      const addProgress = setInterval(() => {
        setProgressPercent((count) => count + 1);
        state += 1;
        if (state >= (activeStep / max) * 100) {
          clearInterval(addProgress);
        }
      }, 10);
    }
  }, [activeStep]);

  return (
    <Flex className="finishCart">
      <Box position="relative" marginTop={"30px"} className="finishCart-step">
        <Stepper
          size="sm"
          colorScheme="yellow"
          index={activeStep}
          gap="0"
          zIndex={2}
          position={"relative"}
        >
          {steps.map((step, index) => (
            <Tooltip
              key={index}
              hasArrow
              label={step.description}
              bg="gray.300"
              color="black"
              placement="auto-start"
            >
              <Step
                aria-label={step.description}
                onClick={() => dispatch(setStepOrder({ step: index }))}
              >
                <StepIndicator bg="white">
                  <StepStatus complete={<StepIcon />} />
                </StepIndicator>
                <Box flexShrink="0" bg="white" padding={"5px"}>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </Box>
              </Step>
            </Tooltip>
          ))}
        </Stepper>
        <Progress
          value={progressPercent}
          position="absolute"
          height="3px"
          width="calc(100% - 95px)"
          colorScheme="yellow"
          bgColor={"#eeeeee"}
          top="50%"
          transform={"translateY(-50%)"}
          zIndex={1}
        />
      </Box>
      {steps[activeStep].component}
    </Flex>
  );
}